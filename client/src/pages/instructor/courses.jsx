import TableRowSheletonOne from "@/components/instructor-view/common/table-row-skeleton-1";
import CourseListTableRow from "@/components/instructor-view/course-table-row";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CourseContext } from "@/context/course-context";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

function InstructorCoursePage() {
  const { courseList, loading, fetchData } = useContext(CourseContext);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card className={"shadow-none"}>
      <CardHeader className={"flex justify-between items-center"}>
        <CardTitle className={"text-xl font-bold"}>All Courses</CardTitle>
        <Link to={"/instructor/add-new-course"}>
          <Button size={"sm"}>Create New Course</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Courses</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && courseList.length == 0 ? (
                <TableRowSheletonOne />
              ) : courseList && courseList.length > 0 ? (
                courseList.map((item) => {
                  return (
                    <CourseListTableRow courseDetails={item} key={item._id} />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No course</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCoursePage;
