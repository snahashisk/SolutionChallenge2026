"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { useState, useEffect, use } from "react";
import axios from "axios";
import Maps from "@/components/Maps";
import axiosInstance from "@/lib/axios";

import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/user";
import Dialog13 from "@/components/shadcn-studio/dialog/dialog-13";

export default function Page({
  params,
}: {
  params: Promise<{ reportid: string }>;
}) {
  const userId = useUserStore((state) => state.user?._id);
  const resolvedParams = use(params);
  const { reportid } = resolvedParams;
  const router = useRouter();

  const [data, setData] = useState<any>(null);
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`/api/v1/report/reports/${reportid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setSteps(res.data.data.stepsToResolve.split(/\d+\.\s/).filter(Boolean));
      })
      .catch((err) => console.error(err));
  }, [reportid]);

  const handleOpenChat = () => {
    router.push(`/dashboard/reportdetail/${reportid}/teamchat`);
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
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="py-8 sm:py-16 lg:py-2">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                  <div className="mb-8 space-y-2">
                    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                      {data?.title}
                    </h2>
                    <p className="leading-7 [&:not(:first-child)]:mt-4">
                      {data?.description}
                    </p>
                    <img
                      src={data?.imageOfReport}
                      alt=""
                      className="my-6 rounded-lg "
                    />
                    <Separator />
                    <div className="space-y-2 my-4">
                      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        Steps to Resolve
                      </h4>
                      <ul className="my-2 ml-6 list-disc [&>li]:mt-2">
                        {steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                    <Separator />
                    <Maps lat={data?.location?.lat} lng={data?.location?.lng} />
                    <Separator />
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
                      <div className="flex flex-col gap-1">
                        <strong>Address</strong>
                        <p>{data?.address}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Landmark</strong>
                        <p>{data?.landmark}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Locality</strong>
                        <p>{data?.locality}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>City</strong>
                        <p>{data?.city}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
                      <div className="flex flex-col gap-1">
                        <strong>State</strong>
                        <p>{data?.state}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Pincode</strong>
                        <p>{data?.pinCode}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Country</strong>
                        <p>{data?.country}</p>
                      </div>
                    </div>

                    <Separator />
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-6">
                      <div className="flex flex-col gap-1">
                        <strong>Category</strong>
                        <p>{data?.category}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>People Affected</strong>
                        <p>{data?.affectedPeople}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Urgency Level</strong>
                        <p>{data?.urgencyLevel}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Status</strong>
                        <p>{data?.status}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 my-6">
                      <div className="flex flex-col gap-1">
                        <strong>Reporter Name</strong>
                        <p>{data?.reporterName}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <strong>Reporter Email</strong>
                        <p>{data?.reporterEmail}</p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="mt-8 flex justify-end gap-3 ">
                    {data?.status === "InProgress" &&
                      data?.assignedMembers?.includes(userId) && (
                        <>
                          <Dialog13 data={data} />
                          <Button
                            variant="secondary"
                            className=" cursor-pointer"
                            onClick={handleOpenChat}
                          >
                            Open Team Chat
                          </Button>
                        </>
                      )}
                    {data?.status === "InProgress" &&
                      data?.assignedMembers?.includes(userId) === false && (
                        <>
                          <Button
                            variant="secondary"
                            className=" cursor-pointer"
                          >
                            Join as Volunteer
                          </Button>
                        </>
                      )}
                    {data?.status === "Verified" && (
                      <>
                        <Button variant="default" className="cursor-pointer">
                          Join as Captain
                        </Button>
                        <Button variant="secondary" className=" cursor-pointer">
                          Join as Volunteer
                        </Button>
                      </>
                    )}
                    {data?.isVerified === false && (
                      <>
                        <Button
                          variant="default"
                          className="w-24 cursor-pointer"
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          className="w-24 cursor-pointer"
                        >
                          Reject
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      className="w-20 cursor-pointer"
                      onClick={() => router.back()}
                    >
                      Go Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
