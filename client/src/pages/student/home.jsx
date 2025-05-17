import useFetch from "@/hooks/useFetch";
import bannerImg from "../../assets/banner-img.png";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
import CourseCardTile from "@/components/student-view/course-card-tile";
import CourseCardTileSkeleton from "@/components/student-view/skeleton/course-card-tile-skeleton";

function StudentHomePage() {
  const navigate = useNavigate();
  const { data: categoryList, categoryListLoading } = useFetch(
    "/api/student/category/fetch-active"
  );

  const { data: courseList, loading: courseListLoading } = useFetch(
    "/api/student/course/fetch"
  );

  function handleCategoryRedirect(getCategoryValue) {
    sessionStorage.setItem(
      "filter",
      JSON.stringify({ category: [getCategoryValue] })
    );
    return navigate("/courses");
  }

  return (
    <div className="min-h-screen space-y-5 md:space-y-10 py-18 px-4 sm:px-6 lg:px-10 xl:px-28">
      <section className="flex flex-col md:flex-row justify-center items-center">
        <div className="h-full w-full md:w-1/2 items-center space-y-1 p-2 md:p-4">
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Learning that gets you
          </h1>
          <p className="text-base md:text-lg">
            Skill for your present and your future. Get Started with us
          </p>
        </div>
        <div className="w-full h-full">
          <img
            src={bannerImg}
            alt="banner-img"
            className="h-full w-full shadow-lg rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="w-full">
        <h1 className="text-lg md:text-2xl mb-5 font-extrabold">
          Course Categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
          {categoryListLoading ? (
            Array(8)
              .fill(null)
              .map((_, index) => {
                return <Skeleton key={index} className={"w-full h-10"} />;
              })
          ) : categoryList && categoryList.length > 0 ? (
            categoryList.map((item) => {
              return (
                <Button
                  variant={"outline"}
                  key={item._id}
                  onClick={() => handleCategoryRedirect(item._id)}
                  className={`text-xs px-0.5 md:text-sm py-1.5 shadow-sm line-clamp-1 rounded-sm bg-gray-50 border-gray-200 dark:border-gray-800 dark:bg-gray-900/20 cursor-pointer`}
                >
                  {item.name}
                </Button>
              );
            })
          ) : (
            <div className="text-lg font-semibold">No categories found</div>
          )}
        </div>
      </section>
      <section className="w-full">
        <h1 className="text-lg md:text-2xl mb-5 font-extrabold">
          Featured Courses
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {courseListLoading ? (
            Array(6)
              .fill(null)
              .map((_, index) => {
                return <CourseCardTileSkeleton key={index} />;
              })
          ) : courseList && courseList.length > 0 ? (
            courseList.map((item) => {
              return <CourseCardTile key={item._id} courseDetails={item} />;
            })
          ) : (
            <div className="text-lg font-semibold">No courses found</div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
