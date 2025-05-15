import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { useSidebar } from "../../ui/sidebar";
import HandleLogout from "../../common/handle-logout";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { useTheme } from "@/components/theme/theme-provider";

function InstructorHeader() {
  const { toggleSidebar } = useSidebar();
  const { theme } = useTheme();

  return (
    <header
      className={`${
        theme === "dark" ? "bg-zinc-950" : theme === "light" ? "bg-white" : ""
      } flex justify-between px-2 md:px-4 py-3 sticky top-0 w-full border-b-2`}
    >
      <Button onClick={toggleSidebar} variant="none">
        <AlignJustify style={{ width: "25px", height: "25px" }} />
      </Button>
      <div className="space-x-2">
        <ModeToggle />
        <HandleLogout>
          <Button size={"sm"}>
            <LogOut /> <span>Logout</span>
          </Button>
        </HandleLogout>
      </div>
    </header>
  );
}

export default InstructorHeader;
