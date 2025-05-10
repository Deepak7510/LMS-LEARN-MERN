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
import { useNavigate } from "react-router-dom";

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

function CourseListTableRow({ courseDetails }) {
  const navigate = useNavigate();
  return (
    <TableRow>
      <TableCell className="font-medium">{courseDetails?.title}</TableCell>
      <TableCell>{courseDetails?.students?.length}</TableCell>
      <TableCell>₹ {courseDetails.pricing}</TableCell>
      <TableCell>
        <Button
          onClick={() =>
            navigate(`/instructor/edit-course/${courseDetails._id}`)
          }
          size="sm"
          variant="ghost"
        >
          <Edit className="h-6 w-6" />
        </Button>

        <HandleDeleteButton getLevelId={courseDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default CourseListTableRow;
