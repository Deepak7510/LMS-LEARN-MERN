import MyCourseTile from "@/components/student-view/my-course-tile";
import MyCourseTileSkeleton from "@/components/student-view/skeleton-ui/my-course-tile-skeleton";
import { StudentCourseContext } from "@/context/student/student-course-context";
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
      <h1 className="text-lg md:text-2xl mb-5 font-extrabold">My Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mycourseListLoading ? (
          Array(9)
            .fill(null)
            .map((_, index) => {
              return <MyCourseTileSkeleton key={index} />;
            })
        ) : myCourseList && myCourseList.length > 0 ? (
          myCourseList.map((item) => {
            return <MyCourseTile key={item._id} courseDetails={item.course} />;
          })
        ) : (
          <div className="text-lg font-semibold">No courses found</div>
        )}
      </div>
    </div>
  );
}

export default StudentMyCoursesPage;
