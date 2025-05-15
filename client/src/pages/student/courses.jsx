import CourseCardTile from "@/components/student-view/course-card-tile";
import FilterCourseHeader from "@/components/student-view/filter-course-header";
import FilterCoursesSidebar from "@/components/student-view/filter-course-sidebar";
import CourseCardTileSkeleton from "@/components/student-view/skeleton/course-card-tile-skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StudentCourseContext } from "@/context/student/student-course-context";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function createSearchParams(getFilterParams) {
  const paramsValue = [];
  for (let [key, value] of Object.entries(getFilterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const filterkeyValue = `${key}=${value.join(",")}`;
      paramsValue.push(filterkeyValue);
    }
  }
  return paramsValue.join("&");
}
function StudentCoursePage() {
  const { courseFilterList, loading, fetchData } =
    useContext(StudentCourseContext);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const paramsValue = createSearchParams(filter);
      setSearchParams(new URLSearchParams(paramsValue));
    }
  }, [filter]);

  useEffect(() => {
    const stored = sessionStorage.getItem("filter");
    if (stored) {
      const parsedFilter = JSON.parse(stored);
      setFilter(parsedFilter);
      fetchData(parsedFilter, sort);
    } else {
      fetchData({}, sort);
    }
  }, []);

  useEffect(() => {
    if (filter !== null && sort !== null) fetchData(filter, sort);
  }, [filter, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filter");
    };
  }, []);

  function handleFilter(filterKey, filterValue) {
    let cpyFilter = { ...filter };
    const checkFilterKeyOrNot = Object.keys(cpyFilter).indexOf(filterKey);
    if (checkFilterKeyOrNot === -1) {
      cpyFilter = { ...filter, [filterKey]: [filterValue] };
    } else {
      const checkFilterValuePersentOrNotInFilterKey =
        cpyFilter[filterKey].indexOf(filterValue);

      if (checkFilterValuePersentOrNotInFilterKey === -1) {
        cpyFilter[filterKey].push(filterValue);
      } else {
        cpyFilter[filterKey].splice(checkFilterValuePersentOrNotInFilterKey, 1);
      }
    }
    setFilter(cpyFilter);
    sessionStorage.setItem("filter", JSON.stringify(cpyFilter));
  }
  return (
    <SidebarProvider className="w-full top-0 flex">
      <div className="relative">
        <FilterCoursesSidebar filter={filter} handleFilter={handleFilter} />
      </div>
      <main className="w-full relative overflow-y-auto h-screen pt-14">
        <FilterCourseHeader sort={sort} setSort={setSort} />
        <div className={"px-5 py-3"}>
          <div
            className={
              "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
            }
          >
            {loading ? (
              Array(9)
                .fill(null)
                .map((_, index) => <CourseCardTileSkeleton key={index} />)
            ) : courseFilterList && courseFilterList.length > 0 ? (
              courseFilterList.map((item) => {
                return <CourseCardTile courseDetails={item} key={item._id} />;
              })
            ) : (
              <div>No Course</div>
            )}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

export default StudentCoursePage;
