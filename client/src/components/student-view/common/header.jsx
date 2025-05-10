import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import HandleLogout from "../../instructor-view/common/handle-logout";

function StudentHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <header className="flex justify-between items-center shadow fixed w-full bg-white border-b py-2.5 px-6 z-10">
      <div className="flex items-center space-x-4">
        <Link to={"/home"} className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8" />
          <span className="text-lg font-extrabold">LMS LEARN</span>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          className={"cursor-pointer"}
          onClick={() => {
            !location.pathname.includes("/courses")
              ? navigate("/courses")
              : null;
          }}
          variant={"ghost"}
        >
          Explore Courses
        </Button>
        <Button
          onClick={() => navigate("/my-courses")}
          variant={"ghost"}
          className="flex gap-2 cursor-pointer justify-center items-center"
        >
          <TvMinimalPlay className="w-6 h-6" />
          <span>My Courses</span>
        </Button>
        <HandleLogout>
          <Button className={"cursor-pointer"}>Sign Out</Button>
        </HandleLogout>
      </div>
    </header>
  );
}

export default StudentHeader;
