"use client";
import { useUserStore } from "@/store/user";
import { use, useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import DashboardFooter from "@/components/ui/dashboardFooter";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IoIosSend } from "react-icons/io";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { io, type Socket } from "socket.io-client";
import { useEffect, useRef } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";

type Message = {
  _id: string;
  reportId: string;
  sender: string;
  fullName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export default function Page({ params }: { params: Promise<{ reportid: string }> }) {
  const resolvedParams = use(params);
  const { reportid } = resolvedParams;
  const userId = useUserStore((state) => state.user?._id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef<Socket | null>(null);
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const appendMessage = (message: Message) => {
    setMessages((prev) => (prev.some((existing) => existing._id === message._id) ? prev : [...prev, message]));
  };

  useEffect(() => {
    socketRef.current = io(`${process.env.NEXT_PUBLIC_API_BASE_URL}`, {
      withCredentials: true,
    });

    // join room
    socketRef.current.emit("join_room", reportid);

    // listen for messages
    socketRef.current.on("new_message", appendMessage);

    socketRef.current.on("someone_typing", () => {
      setIsTyping(true);
    });

    socketRef.current.on("stop_typing", () => {
      setIsTyping(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [reportid]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance
          .get(`/api/v1/message/report/${reportid}`, { withCredentials: true })
          .then((res) => {
            return res;
          });
        setMessages(response.data.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [reportid]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const response = await axiosInstance.post(
      "/api/v1/message/",
      {
        reportId: reportid,
        content: newMessage,
      },
      { withCredentials: true },
    );

    const savedMessage = response.data.data as Message;
    appendMessage(savedMessage);
    setNewMessage("");
  };
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="h-screen flex flex-col overflow-hidden">
        <SiteHeader />
        <div className="@container/main flex flex-1 flex-col gap-4 md:gap-6 py-8 sm:py-16 md:py-6 lg:py-2 min-h-0 overflow-hidden">
          <div className="flex flex-1 flex-col w-full mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 min-h-0">
            <Card className="flex flex-col w-full flex-1 min-h-0 overflow-hidden">
              <CardHeader>
                <CardTitle>Team Chat</CardTitle>
                <CardDescription className="text-primary">
                  {isTyping ? "Someone is typing..." : "Chat with your team members"}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto min-h-0">
                <div className="flex gap-3 flex-col">
                  {messages.map((msg: Message) => {
                    const isMe = msg.sender === userId;
                    return (
                      <div key={msg._id} className={`flex gap-3 items-end ${isMe ? "justify-end" : "justify-start"}`}>
                        {!isMe && (
                          <Avatar>
                            <AvatarFallback>
                              {msg.fullName
                                ? msg.fullName.split(" ")[0].charAt(0).toUpperCase() +
                                  (msg.fullName.split(" ")[1]?.charAt(0).toUpperCase() || "")
                                : ""}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`p-3 rounded-lg max-w-[70%] ${
                            isMe ? "bg-muted rounded-br-none" : "bg-muted rounded-bl-none"
                          }`}
                        >
                          <p className="font-semibold text-sm mb-1">{isMe ? "You" : msg.fullName}</p>
                          <p>{msg.content}</p>
                        </div>
                        {isMe && (
                          <Avatar>
                            <AvatarFallback>
                              {msg.fullName
                                ? msg.fullName.split(" ")[0].charAt(0).toUpperCase() +
                                  (msg.fullName.split(" ")[1]?.charAt(0).toUpperCase() || "")
                                : ""}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messageEndRef} />
                </div>
              </CardContent>
              <CardFooter>
                <Field orientation="horizontal">
                  <Input
                    type="search"
                    placeholder="Type your message..."
                    className="bg-white"
                    value={newMessage}
                    onChange={(e) => {
                      setNewMessage(e.target.value);

                      socketRef.current?.emit("typing", reportid);

                      if (typingTimeoutRef.current) {
                        clearTimeout(typingTimeoutRef.current);
                      }

                      typingTimeoutRef.current = setTimeout(() => {
                        socketRef.current?.emit("stop_typing", reportid);
                      }, 1000);
                    }}
                  />
                  <Button className="cursor-pointer" onClick={handleSendMessage}>
                    Send <IoIosSend />
                  </Button>
                </Field>
              </CardFooter>
            </Card>
          </div>
        </div>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
