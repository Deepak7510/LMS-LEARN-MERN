import CourseCorriculum from "@/components/instructor-view/corriculum";
import CourseLanding from "@/components/instructor-view/course-landing";
import CourseSettings from "@/components/instructor-view/course-settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseContext } from "@/context/course-context";
import { createCourse, fetchCourseById, updateCourse } from "@/service/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Schema
const formSchema = z.object({
  title: z.string().nonempty("Title is required."),
  category: z.string().nonempty("Category is required."),
  level: z.string().nonempty("Level is required."),
  primaryLanguage: z.string().nonempty("Primary language is required."),
  subTitle: z.string().nonempty("Subtitle is required."),
  description: z
    .string()
    .refine((val) => val !== "<p><br></p>" && val.trim() !== "", {
      message: "Description is required",
    }),
  pricing: z.coerce.number().min(1, "Pricing must be greater than 0."),
  objectives: z.string().nonempty("Objectives are required."),
  welcomemessage: z.string().nonempty("Welcome message is required."),
  curriculum: z.array(
    z.object({
      title: z.string().nonempty("Title is required"),
      freePreview: z.boolean(),
      videoUrl: z.string().nonempty("Video URL is required"),
      public_id: z.string().nonempty("public_id is required"),
    })
  ),
  image: z.object({
    image_url: z.string().nonempty("Image is required."),
    public_id: z.string().nonempty("public_id is required"),
  }),
});

function InstructorAddCoursePage() {
  const { fetchData } = useContext(CourseContext);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      level: "",
      primaryLanguage: "",
      subTitle: "",
      description: "",
      pricing: 0,
      objectives: "",
      welcomemessage: "",
      curriculum: [
        {
          title: "",
          freePreview: false,
          videoUrl: "",
          public_id: "",
        },
      ],
      image: {
        image_url: "",
        public_id: "",
      },
    },
  });

  async function onSubmit(formData) {
    const curriculum = form.watch("curriculum");
    const checkOneFreePriviewOrNot = curriculum.some((item) => {
      return item.freePreview == true;
    });
    if (!checkOneFreePriviewOrNot) {
      toast.error("One free preview is required");
      return;
    }

    let result;
    if (id !== null && location.pathname.includes("edit-course")) {
      result = await updateCourse(formData, id);
    } else {
      result = await createCourse(formData);
    }
    if (result.success) {
      toast.success(result.message);
      form.reset();
      await fetchData();
      return navigate("/instructor/courses");
    }
  }

  useEffect(() => {
    if (id !== null && location.pathname.includes("edit-course")) {
      async function fetchData() {
        const result = await fetchCourseById(id);
        if (result.success) {
          form.reset(result.data);
        } else {
          return navigate("/instructor/courses");
        }
      }
      fetchData();
    }
  }, [id]);

  return (
    <FormProvider {...form}>
      <Card className={"shadow-none"}>
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">
            {id ? "Edit Course" : "Add New Course"}
          </CardTitle>
          <Button size="sm" onClick={form.handleSubmit(onSubmit)}>
            {id ? "Save change" : "SUBMIT"}
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="course-landing-page">
            <TabsList>
              <TabsTrigger value="course-landing-page">
                Course Landing Page
              </TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="course-landing-page">
              <CourseLanding />
            </TabsContent>
            <TabsContent value="curriculum">
              <CourseCorriculum form={form} />
            </TabsContent>
            <TabsContent value="settings">
              <CourseSettings form={form} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

export default InstructorAddCoursePage;
