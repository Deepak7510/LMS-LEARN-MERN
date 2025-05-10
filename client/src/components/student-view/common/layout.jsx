import { Outlet } from "react-router-dom";
import StudentHeader from "./header";

function StudentLayout() {
  return (
    <div>
      <StudentHeader />
      <main className="max-w-[1600px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;
