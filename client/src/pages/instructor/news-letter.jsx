import InstructorNewsLetterTableRow from "@/components/instructor-view/new-letter-table-row";
import NewsLetterTableRowSkeleton from "@/components/instructor-view/skeleton/newletter-row-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFetch from "@/hooks/useFetch";

function InstructorNewsLetterPage() {
  const { data, loading, fetchData } = useFetch(
    "/api/instructor/newsletter/fetch"
  );
  return (
    <Card className={"shadow-none"}>
      <CardHeader>
        <CardTitle className={"font-bold text-xl"}>
          All Newsletter Email
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && data === null ? (
              Array(10)
                .fill(null)
                .map((_, index) => {
                  return <NewsLetterTableRowSkeleton key={index} />;
                })
            ) : data && data.length > 0 ? (
              data.map((item) => {
                return (
                  <InstructorNewsLetterTableRow
                    newLetterDetails={item}
                    key={item._id}
                    fetchData={fetchData}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell className="font-medium">
                  No NewsLetter email
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default InstructorNewsLetterPage;
