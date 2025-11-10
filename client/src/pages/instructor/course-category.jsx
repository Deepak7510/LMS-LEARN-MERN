import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  createCategoryService,
  updateCategoryService,
} from "@/service/instructor/category";
import { toast } from "sonner";
import { CategoryContext } from "@/context/instructor/category-context";
import TableRowSheletonOne from "@/components/instructor-view/skeleton/table-row-skeleton-1";
import CategoryListTableRow from "@/components/instructor-view/category-table-row";

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  status: z.string().nonempty("Status is required."),
});
function InstructorCourseCategoryPage() {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const { categoryList, loading, fetchData } = useContext(CategoryContext);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Active",
    },
  });

  async function onSubmit(formData) {
    let response;
    if (editId === null) {
      response = await createCategoryService(formData);
    } else {
      response = await updateCategoryService(formData, editId);
    }
    if (response.success) {
      await fetchData();
      toast.success(response.message);
      setEditId(null);
      setOpenAddCategoryDialog(false);
      form.reset();
    } else {
      toast.error(response.message);
    }
  }

  function handleEdit(getCategoryDetails) {
    setEditId(getCategoryDetails._id);
    form.setValue("name", getCategoryDetails.name);
    form.setValue("status", getCategoryDetails.status);
    setOpenAddCategoryDialog(true);
  }

  return (
    <Card className={"shadow-none"}>
      <CardHeader className={"flex justify-between items-center"}>
        <CardTitle className={"text-xl font-bold"}>
          All Course Category
        </CardTitle>
        <Button
          onClick={() => {
            setOpenAddCategoryDialog(true);
          }}
          size={"sm"}
        >
          Create New
        </Button>
        <Dialog
          open={openAddCategoryDialog}
          onOpenChange={() => {
            setOpenAddCategoryDialog(false);
            form.reset();
            setEditId(null);
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={"font-bold"}>
                Add Course Category
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter category name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value?.toString()}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Active" id="Active" />
                            <Label htmlFor="Active">Active</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Inactive" id="Inactive" />
                            <Label htmlFor="Inactive">Inactive</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className={"w-full"}
                >
                  Save
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && categoryList.length === 0 ? (
                Array(10)
                  .fill(null)
                  .map((_, index) => {
                    return <TableRowSheletonOne key={index} />;
                  })
              ) : categoryList && categoryList.length > 0 ? (
                categoryList.map((item) => {
                  return (
                    <CategoryListTableRow
                      categoryDetails={item}
                      key={item._id}
                      handleEdit={handleEdit}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No category</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourseCategoryPage;
