import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import DashboardFooter from "@/components/ui/dashboardFooter";
import Emergency from "@/components/Emergency";

export default function Page() {
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
          <div className="flex flex-1 flex-col w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-0">
            <Emergency />
          </div>
        </div>
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
