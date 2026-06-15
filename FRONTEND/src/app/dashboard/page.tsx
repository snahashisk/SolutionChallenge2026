"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import DataTableWithColumnFilterDemo from "@/components/shadcn-studio/data-table/data-table-04";
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import axiosInstance from "@/lib/axios";
import { useUserStore } from "@/store/user";
import { toast } from "sonner";

import DashboardFooter from "@/components/ui/dashboardFooter";

export default function Page() {
  const userId = useUserStore((state) => state.user?._id);

  //fetch all reports
  const [reports, setReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [verifiedReports, setVerifiedReports] = useState([]);
  const [inProgressReports, setInProgressReports] = useState([]);
  const [joinedReports, setJoinedReports] = useState([]);
  const [resolvedReports, setResolvedReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/report/reports", {
          withCredentials: true,
        });
        setReports(response.data.data);
        const pendingReports = response.data.data.filter(
          (report: any) => report.isVerified === false && report.status !== "Rejected",
        );
        const verifiedReports = response.data.data.filter(
          (report: any) => report.isVerified === true && report.status === "Verified",
        );
        const inProgressReports = response.data.data.filter(
          (report: any) =>
            report.isVerified === true && report.status === "InProgress" && !report.assignedMembers.includes(userId),
        );
        const joinedReports = response.data.data.filter(
          (report: any) =>
            report.isVerified === true && report.status === "InProgress" && report.assignedMembers.includes(userId),
        );
        const resolvedReports = response.data.data.filter(
          (report: any) => report.isVerified === true && report.status === "Resolved",
        );
        setPendingReports(pendingReports);
        setVerifiedReports(verifiedReports);
        setInProgressReports(inProgressReports);
        setJoinedReports(joinedReports);
        setResolvedReports(resolvedReports);
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    };
    fetchReports();
  }, [userId]);
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
              <SectionCards />
              <Separator />
              <div className="px-4 lg:px-6">
                <DataTableWithColumnFilterDemo data={joinedReports} status="joined" />
              </div>
              <Separator />
              <div className="px-4 lg:px-6">
                <DataTableWithColumnFilterDemo data={inProgressReports} status="inprogress" />
              </div>
              <Separator />
              <div className="px-4 lg:px-6">
                <DataTableWithColumnFilterDemo data={verifiedReports} status="verified" />
              </div>
              <Separator />
              <div className="px-4 lg:px-6">
                <DataTableWithColumnFilterDemo data={pendingReports} status="pending" />
              </div>
              <Separator />
              <div className="px-4 lg:px-6">
                <DataTableWithColumnFilterDemo data={resolvedReports} status="resolved" />
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
