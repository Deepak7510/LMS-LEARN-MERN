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
import { instructorDeleteNewsLetterService } from "@/service/instructor/news-letter";

function HandleDeleteButton({ getNewsLetterId, fetchData }) {
  async function handleDelete(newsLetterId) {
    const response = await instructorDeleteNewsLetterService(newsLetterId);
    if (response.success) {
      toast.success(response.message);
      await fetchData();
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
          <AlertDialogAction onClick={() => handleDelete(getNewsLetterId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function InstructorNewsLetterTableRow({ newLetterDetails, fetchData }) {
  return (
    <TableRow>
      <TableCell>{newLetterDetails.email}</TableCell>
      <TableCell>
        <HandleDeleteButton
          getNewsLetterId={newLetterDetails._id}
          fetchData={fetchData}
        />
      </TableCell>
    </TableRow>
  );
}

export default InstructorNewsLetterTableRow;
