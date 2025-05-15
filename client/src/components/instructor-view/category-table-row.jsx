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
import { deleteCategoryService } from "@/service/instructor/category";
import { toast } from "sonner";
import { useContext } from "react";
import { CategoryContext } from "@/context/instructor/category-context";

function HandleDeleteButton({ getCategoryId }) {
  const { fetchData } = useContext(CategoryContext);

  async function handleDelete(categoryId) {
    const response = await deleteCategoryService(categoryId);
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
          <AlertDialogAction onClick={() => handleDelete(getCategoryId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CategoryListTableRow({ categoryDetails, handleEdit }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{categoryDetails.name}</TableCell>
      <TableCell>{categoryDetails.slug}</TableCell>
      <TableCell>{categoryDetails.status.toString()}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            handleEdit(categoryDetails);
          }}
          size="sm"
          variant="ghost"
        >
          <Edit className="h-6 w-6" />
        </Button>

        <HandleDeleteButton getCategoryId={categoryDetails._id} />
      </TableCell>
    </TableRow>
  );
}

export default CategoryListTableRow;
