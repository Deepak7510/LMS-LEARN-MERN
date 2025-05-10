import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import {
  ArrowBigUp,
  BookOpen,
  Languages,
  LayoutDashboard,
  NotebookText,
} from "lucide-react";
const items = [
  {
    title: "Dashboard",
    url: "/instructor/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "Course Category",
    url: "/instructor/course-category",
    icon: <NotebookText />,
  },
  {
    title: "Course Level",
    url: "/instructor/course-level",
    icon: <ArrowBigUp />,
  },
  {
    title: "Course Language",
    url: "/instructor/course-language",
    icon: <Languages />,
  },
  {
    title: "Courses",
    url: "/instructor/courses",
    icon: <BookOpen />,
  },
];
function InstructorSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-xl font-extrabold"}>
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default InstructorSidebar;
