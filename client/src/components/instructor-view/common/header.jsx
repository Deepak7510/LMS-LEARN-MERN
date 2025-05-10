import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
import { useSidebar } from "../../ui/sidebar";
import HandleLogout from "./handle-logout";

function InstructorHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex justify-between px-2 md:px-4 py-3.5 sticky top-0 w-full bg-white border-b">
      <Button onClick={toggleSidebar} variant="none">
        <AlignJustify style={{ width: "25px", height: "25px" }} />
      </Button>
      <HandleLogout>
        <Button size={"sm"}>
          <LogOut /> <span>Logout</span>
        </Button>
      </HandleLogout>
    </header>
  );
}

export default InstructorHeader;
