import MyCourseTile from "@/components/student-view/my-course-tile";
import { Skeleton } from "@/components/ui/skeleton";
import { StudentCourseContext } from "@/context/student-course-context";
import { useContext, useEffect } from "react";

function StudentMyCoursesPage() {
  const {
    loading: mycourseListLoading,
    myCourseList,
    fetchMyCourseList,
  } = useContext(StudentCourseContext);

  useEffect(() => {
    fetchMyCourseList();
  }, []);

  return (
    <div className="w-full py-18 px-4 sm:px-6 lg:px-10 xl:px-28">
      <h1 className="text-2xl mb-5 font-extrabold">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mycourseListLoading
          ? Array(8)
              .fill(null)
              .map((_, index) => {
                return <Skeleton key={index} className={"w-full h-10"} />;
              })
          : myCourseList && myCourseList.length > 0
          ? myCourseList.map((item) => {
              return (
                <MyCourseTile key={item._id} courseDetails={item.course} />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default StudentMyCoursesPage;
