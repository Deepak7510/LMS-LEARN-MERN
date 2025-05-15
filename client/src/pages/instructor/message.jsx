import InstructorMessageTableRow from "@/components/instructor-view/message-table-row";
import TableRowSheletonOne from "@/components/instructor-view/skeleton/table-row-skeleton-1";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstructorMessageContext } from "@/context/instructor/message-context";
import { useContext, useEffect, useState } from "react";

function InstructorMessagePage() {
  const { messageList, loading, fetchMessageList } = useContext(
    InstructorMessageContext
  );

  const [viewtMessageInDetails, setViewtMessageInDetails] = useState(null);
  const [openViewtMessageInDetailsDialog, setOpenViewMessageInDetailsDialog] =
    useState(false);

  useEffect(() => {
    fetchMessageList();
  }, []);

  function handleViewMessageInDetails(getViewtMessageInDetails) {
    setOpenViewMessageInDetailsDialog(true);
    setViewtMessageInDetails(getViewtMessageInDetails);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"text-xl font-bold"}>All Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog
          open={openViewtMessageInDetailsDialog}
          onOpenChange={() => {
            setOpenViewMessageInDetailsDialog(false);
            setViewtMessageInDetails(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Message</DialogTitle>
            </DialogHeader>
            <div>Name : {viewtMessageInDetails?.name}</div>
            <div>Email : {viewtMessageInDetails?.email}</div>
            <div>Message : {viewtMessageInDetails?.message}</div>
          </DialogContent>
        </Dialog>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && messageList.length == 0 ? (
              <TableRowSheletonOne />
            ) : messageList && messageList.length > 0 ? (
              messageList.map((item) => {
                return (
                  <InstructorMessageTableRow
                    messageDetails={item}
                    key={item._id}
                    handleViewMessageInDetails={handleViewMessageInDetails}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell>No Message</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default InstructorMessagePage;
