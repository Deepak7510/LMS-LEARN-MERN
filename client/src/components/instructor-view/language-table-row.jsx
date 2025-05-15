import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
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
import { LanguageContext } from "@/context/instructor/language-context";
import { deleteLanguageService } from "@/service/instructor/language";

function HandleDeleteButton({ getLanguageId }) {
  const { fetchData } = useContext(LanguageContext);

  async function handleDelete(levelId) {
    const response = await deleteLanguageService(levelId);
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
          <AlertDialogAction onClick={() => handleDelete(getLanguageId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LanguageListTableRow({ languageDetails, handleEdit }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{languageDetails.name}</TableCell>
      <TableCell>{languageDetails.slug}</TableCell>
      <TableCell>{languageDetails.status.toString()}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            handleEdit(languageDetails);
          }}
          size="sm"
          variant="ghost"
        >
          <Edit className="h-6 w-6" />
        </Button>
        <HandleDeleteButton getLanguageId={languageDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default LanguageListTableRow;
