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
import { useNavigate } from "react-router-dom";
import { CourseContext } from "@/context/instructor/course-context";
import { deleteCourseService } from "@/service/instructor/course";

function HandleDeleteButton({ getCourseId }) {
  const { fetchData } = useContext(CourseContext);

  async function handleDelete(courseId) {
    const response = await deleteCourseService(courseId);
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
          <AlertDialogAction onClick={() => handleDelete(getCourseId)}>
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
        <HandleDeleteButton getCourseId={courseDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default CourseListTableRow;
