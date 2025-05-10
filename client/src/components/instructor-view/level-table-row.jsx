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
import { LevelContext } from "@/context/level-context";
import { deleteLevel } from "@/service/level";

function HandleDeleteButton({ getLevelId }) {
  const { fetchData } = useContext(LevelContext);

  async function handleDelete(levelId) {
    const response = await deleteLevel(levelId);
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
          <AlertDialogAction onClick={() => handleDelete(getLevelId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LevelListTableRow({ LevelDetails, handleEdit }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{LevelDetails.name}</TableCell>
      <TableCell>{LevelDetails.slug}</TableCell>
      <TableCell>{LevelDetails.status.toString()}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            handleEdit(LevelDetails);
          }}
          size="sm"
          variant="ghost"
        >
          <Edit className="h-6 w-6" />
        </Button>

        <HandleDeleteButton getLevelId={LevelDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default LevelListTableRow;
