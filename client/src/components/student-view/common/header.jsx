import { AlignJustify, GraduationCap } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import HandleLogout from "../../common/handle-logout";
import { ModeToggle } from "@/components/theme/mode-toggle";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentHeaderNav({ authData }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav>
      <ul className="flex flex-col md:flex-row  font-medium gap-5">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <div
            className="cursor-pointer"
            onClick={() => {
              location.pathname.includes("/courses")
                ? null
                : navigate("/courses");
            }}
          >
            Courses
          </div>
        </li>
        {authData?.isAuthenticated === true && (
          <li>
            <Link to={"/my-courses"}>My Courses</Link>
          </li>
        )}
        <li>
          <Link to={"/about-us"}>About us</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

function StudentHeaderRightSideContent({ authData }) {
  return (
    <div className="flex items-center space-x-2">
      <ModeToggle />
      {authData?.isAuthenticated ? (
        <HandleLogout>
          <Button size={"sm"}>Logout</Button>
        </HandleLogout>
      ) : (
        <Button>
          <Link to={"/auth"}>Login</Link>
        </Button>
      )}
    </div>
  );
}

function StudentHeader() {
  const [openSideNavbar, setOpenSideNavbar] = useState(false);
  const { authData } = useContext(AuthContext);

  return (
    <header
      className={`bg-background flex justify-between items-center shadow fixed w-full border-b-2 py-3 px-6 z-10 select-none`}
    >
      <div className="flex items-center space-x-4">
        <Link to={"/home"} className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8" />
          <span className="text-lg font-extrabold">LMS LEARN</span>
        </Link>
      </div>

      <div className="hidden md:block">
        <StudentHeaderNav authData={authData} />
      </div>
      <div className="hidden md:block">
        <StudentHeaderRightSideContent authData={authData} />
      </div>

      <div className="md:hidden">
        <Label onClick={() => setOpenSideNavbar(true)}>
          <AlignJustify className="w-6 h-6" />
        </Label>

        {/* for Mobile navbar */}
        <Sheet open={openSideNavbar} onOpenChange={setOpenSideNavbar}>
          <SheetContent
            aria-describedby={undefined}
            side="left"
            className={"ps-6 pt-6"}
          >
            <SheetTitle className={"hidden"}></SheetTitle>
            <StudentHeaderNav />
            <div className="absolute bottom-4 left-4">
              <StudentHeaderRightSideContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default StudentHeader;
