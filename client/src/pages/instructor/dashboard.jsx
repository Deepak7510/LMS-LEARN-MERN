import EnrolledTableRowSkeleton from "@/components/instructor-view/skeleton/enrolledlist-table-row-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";

function InstructorDashboardPage() {
  const { data, loading } = useFetch("/api/instructor/dashboard/fetch");

  const totalAmount =
    data && data.totatEnrolledStudentList.length > 0
      ? data.totatEnrolledStudentList.reduce((pre, curr) => {
          return pre + curr.amount;
        }, 0)
      : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {loading ? (
          Array(9)
            .fill(null)
            .map((_, index) => {
              return (
                <Card key={index} className={`shadow-none`}>
                  <CardContent
                    className={
                      "flex flex-col justify-center items-center gap-2"
                    }
                  >
                    <Skeleton className={"w-full h-6"} />
                    <Skeleton className={"w-1/2 h-6"} />
                  </CardContent>
                </Card>
              );
            })
        ) : data !== null ? (
          <>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Students</div>
                <div className="text-xl font-semibold">
                  {data.totalStudents}
                </div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Categories</div>
                <div className="text-xl font-semibold">
                  {data.totalCategories}
                </div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Levels</div>
                <div className="text-xl font-semibold">{data.totalLevels}</div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Languages</div>
                <div className="text-xl font-semibold">
                  {data.totalLanguages}
                </div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Courses</div>
                <div className="text-xl font-semibold">{data.totalCourses}</div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Revenu</div>
                <div className="text-xl font-semibold">₹ {totalAmount}</div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">
                  Total Enrolled Students
                </div>
                <div className="text-xl font-semibold">
                  {data.totatEnrolledStudent}
                </div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total Message</div>
                <div className="text-xl font-semibold">{data.totatMessage}</div>
              </CardContent>
            </Card>
            <Card className={"shadow-none"}>
              <CardContent className={"text-center"}>
                <div className="text-lg font-medium">Total NewaLetters</div>
                <div className="text-xl font-semibold">
                  {data.totatNewaLetters}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        <Card className={"shadow-none"}>
          <CardHeader>
            <CardTitle className={"text-lg"}>
              All Enrolled Courses List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(8)
                    .fill(null)
                    .map((_, index) => <EnrolledTableRowSkeleton key={index} />)
                ) : data && data.totatEnrolledStudentList.length > 0 ? (
                  data.totatEnrolledStudentList.map((item) => {
                    return (
                      <TableRow>
                        <TableCell className="font-medium">
                          {item.course.title}
                        </TableCell>
                        <TableCell>{item.user.username}</TableCell>
                        <TableCell>{item.user.email}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell>No enrolled list</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default InstructorDashboardPage;
