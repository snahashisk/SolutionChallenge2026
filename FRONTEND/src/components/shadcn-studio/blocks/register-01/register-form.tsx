"use client";

import { MailIcon, UserIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const RegisterForm = () => {
  const [name, setnNme] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    await axiosInstance
      .post("/api/v1/contact/createcontactmessage", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Message sent successfully");
        setnNme("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <Label className="leading-5" htmlFor="username">
          You Name
        </Label>
        <div className="relative">
          <Input
            type="text"
            id="username"
            placeholder="Enter your name here..."
            className="h-10 pr-10"
            value={name}
            onChange={(e) => setnNme(e.target.value)}
          />
          <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="leading-5" htmlFor="userEmail">
          Your Email Address
        </Label>
        <div className="relative">
          <Input
            type="email"
            id="userEmail"
            placeholder="Enter your email here..."
            className="h-10 pr-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MailIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1">
        <Label className="leading-5" htmlFor="message">
          Your Message
        </Label>
        <Textarea
          id="message"
          placeholder="Enter your message here..."
          className="h-25"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <Button
        className="w-full h-10 text-base cursor-pointer"
        type="submit"
        size="icon-lg"
      >
        Send Message
      </Button>
    </form>
  );
};

export default RegisterForm;
