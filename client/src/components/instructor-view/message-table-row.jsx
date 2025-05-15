import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash, ViewIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useContext } from "react";
import { instructorDeleteMessageService } from "@/service/instructor/message";
import { InstructorMessageContext } from "@/context/instructor/message-context";

function HandleDeleteButton({ getMessageId }) {
  const { fetchMessageList } = useContext(InstructorMessageContext);

  async function handleDelete(messageId) {
    const response = await instructorDeleteMessageService(messageId);
    if (response.success) {
      toast.success(response.message);
      await fetchMessageList();
    } else {
      toast.error(response.message);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <Trash className="h-6 w-6" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(getMessageId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function InstructorMessageTableRow({
  messageDetails,
  handleViewMessageInDetails,
}) {
  const message = messageDetails.message
    .split(" ")
    .slice(0, 5)
    .join(" ")
    .concat("...");
  return (
    <TableRow>
      <TableCell className="font-medium">{messageDetails.name}</TableCell>
      <TableCell>{messageDetails.email}</TableCell>
      <TableCell className={"line-clamp-1"}>{message}</TableCell>
      <TableCell>
        <Button
          onClick={() => handleViewMessageInDetails(messageDetails)}
          variant={"ghost"}
        >
          <ViewIcon />
        </Button>
        <HandleDeleteButton getMessageId={messageDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default InstructorMessageTableRow;
