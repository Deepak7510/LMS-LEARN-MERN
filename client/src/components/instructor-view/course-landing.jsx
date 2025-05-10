import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import "react-quill-new/dist/quill.snow.css"; // Import the Quill styles
import ReactQuill from "react-quill-new";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import useFetch from "@/hooks/useFetch";

function CourseLanding() {
  const { control } = useFormContext();

  const { data: levelList } = useFetch("/api/instructor/level/fetch-active");
  const { data: categoryList } = useFetch(
    "/api/instructor/category/fetch-active"
  );
  const { data: languageList } = useFetch(
    "/api/instructor/language/fetch-active"
  );

  return (
    <Card className={"shadow-none"}>
      <CardHeader>
        <CardTitle className={"text-xl font-semibold"}>
          Course landing page
        </CardTitle>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter course title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="subTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Enter subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryList && categoryList.length > 0
                    ? categoryList.map((item) => {
                        return (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {levelList && levelList.length > 0
                    ? levelList.map((item) => {
                        return (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="primaryLanguage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Language</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={"w-full"}>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languageList && languageList.length > 0
                    ? languageList.map((item) => {
                        return (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        );
                      })
                    : null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <ReactQuill className="mb-10" theme="snow" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="pricing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pricing (in ₹)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="objectives"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Objectives</FormLabel>
              <FormControl>
                <Input placeholder="List course goals..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="welcomemessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Welcome Message</FormLabel>
              <FormControl>
                <Input placeholder="Welcome to this course..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

export default CourseLanding;
