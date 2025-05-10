import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../ui/sidebar";
import InstructorSidebar from "./sidebar";
import { Button } from "../../ui/button";
import InstructorHeader from "./header";

function InstructorLayout() {
  return (
    <SidebarProvider>
      <InstructorSidebar />
      <main className="w-full">
        <InstructorHeader />
        <div className="p-3">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}

export default InstructorLayout;
