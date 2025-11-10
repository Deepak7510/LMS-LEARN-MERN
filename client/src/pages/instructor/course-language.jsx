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
import { toast } from "sonner";
import { LanguageContext } from "@/context/instructor/language-context";
import {
  createLanguageService,
  updateLanguageService,
} from "@/service/instructor/language";
import TableRowSheletonOne from "@/components/instructor-view/skeleton/table-row-skeleton-1";
import LanguageListTableRow from "@/components/instructor-view/language-table-row";

const formSchema = z.object({
  name: z.string().nonempty("Name is required."),
  status: z.string().nonempty("Status is required."),
});
function InstructorCourseLanguagePage() {
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [editId, setEditId] = useState(null);
  const { languageList, loading, fetchData } = useContext(LanguageContext);

  useEffect(() => {
    fetchData();
  }, []);

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
      response = await createLanguageService(formData);
    } else {
      response = await updateLanguageService(formData, editId);
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

  function handleEdit(getLanguageDetails) {
    setEditId(getLanguageDetails._id);
    form.setValue("name", getLanguageDetails.name);
    form.setValue("status", getLanguageDetails.status);
    setOpenAddCategoryDialog(true);
  }

  return (
    <Card className={"shadow-none"}>
      <CardHeader className={"flex justify-between items-center"}>
        <CardTitle className={"text-xl font-bold"}>
          All Course Language
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
                Add Course Language
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
                <TableHead>Language</TableHead>
                <TableHead>slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && languageList.length === 0 ? (
                Array(10)
                  .fill(null)
                  .map((_, index) => {
                    return <TableRowSheletonOne key={index} />;
                  })
              ) : languageList && languageList.length > 0 ? (
                languageList.map((item) => {
                  return (
                    <LanguageListTableRow
                      languageDetails={item}
                      key={item._id}
                      handleEdit={handleEdit}
                    />
                  );
                })
              ) : (
                <TableRow>
                  <TableCell>No language</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourseLanguagePage;
