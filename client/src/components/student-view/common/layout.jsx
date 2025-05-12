import { Outlet, useLocation } from "react-router-dom";
import StudentHeader from "./header";
import StudentFooter from "./footer";

function StudentLayout() {
  const loaction = useLocation();

  return (
    <div>
      <StudentHeader />
      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>
      {loaction.pathname === "/courses" ||
      loaction.pathname.includes("/course-progress") ? null : (
        <StudentFooter />
      )}
    </div>
  );
}

export default StudentLayout;
