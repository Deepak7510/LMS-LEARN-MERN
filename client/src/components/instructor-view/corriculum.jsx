import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { deleteMedia, UploadMedia } from "@/service/media";
import VideoPlayer from "./common/video-player";

export const curriculum = [
  {
    title: "",
    freePreview: false,
    videoUrl: "",
    public_id: "",
  },
];

function CourseCorriculum({ form }) {
  const curriculumFormData = form.watch("curriculum");

  function handleAddLecture() {
    form.setValue("curriculum", [...curriculumFormData, curriculum[0]]);
  }

  function handleChange(event, index, value = null) {
    const cpycurriculumFormData = [...curriculumFormData];
    if (value !== null) {
      cpycurriculumFormData[index] = {
        ...cpycurriculumFormData[index],
        freePreview: value,
      };
    } else {
      cpycurriculumFormData[index] = {
        ...cpycurriculumFormData[index],
        [event.target.name]: event.target.value,
      };
    }
    form.setValue("curriculum", cpycurriculumFormData);
  }

  async function handleFileChange(event, index) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    const result = await UploadMedia(formData);
    if (result.success) {
      let cpycurriculumFormData = [...curriculumFormData];
      cpycurriculumFormData[index] = {
        ...cpycurriculumFormData[index],
        videoUrl: result.data.secure_url,
        public_id: result.data.public_id,
      };
      form.setValue("curriculum", cpycurriculumFormData);
    }
  }

  async function handleReplaceVideo(index) {
    let cpycurriculumFormData = [...curriculumFormData];
    const getCurrentVideoPublicId = cpycurriculumFormData[index].public_id;
    const result = await deleteMedia(getCurrentVideoPublicId);
    if (result.success) {
      cpycurriculumFormData[index] = {
        ...cpycurriculumFormData[index],
        public_id: "",
        videoUrl: "",
      };
      form.setValue("curriculum", cpycurriculumFormData);
    }
  }

  async function handleDeleteLecture(index) {
    let cpycurriculumFormData = [...curriculumFormData];
    const getCurrentVideoPublicId = cpycurriculumFormData[index].public_id;
    const result = await deleteMedia(getCurrentVideoPublicId);
    if (result.success) {
      cpycurriculumFormData = cpycurriculumFormData.filter(
        (_, currentIndex) => {
          return currentIndex.toString() !== index.toString();
        }
      );

      if (cpycurriculumFormData.length === 0) {
        form.setValue("curriculum", [curriculum[0]]);
      } else {
        form.setValue("curriculum", cpycurriculumFormData);
      }
    }
  }

  function isCourseCurriculumFormDataValid() {
    return curriculumFormData.every((item) => {
      return (
        item &&
        typeof item === "object" &&
        item.title !== "" &&
        item.videoUrl !== "" &&
        item.public_id !== ""
      );
    });
  }

  return (
    <Card className={"shadow-none"}>
      <CardHeader>
        <CardTitle className={"text-xl font-semibold"}>
          Course curriculum
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button
          disabled={!isCourseCurriculumFormDataValid()}
          size={"sm"}
          onClick={handleAddLecture}
        >
          Add Lecture
        </Button>
        <div className="my-4 space-y-4">
          {curriculumFormData &&
            curriculumFormData.map((_, index) => {
              return (
                <Card className={"shadow-none rounded-md"} key={index}>
                  <CardContent className="space-y-4">
                    <h1 className="text-lg font-semibold my-2">
                      Lecture {index + 1}
                    </h1>
                    <div className="flex items-center gap-5">
                      <div className="space-y-2">
                        <Label
                          htmlFor={"title"}
                          className={`${
                            form.formState.errors?.curriculum?.[index]?.title
                              ? "text-red-600"
                              : ""
                          }`}
                        >
                          Title
                        </Label>
                        <Input
                          id="title"
                          type={"text"}
                          name="title"
                          placeholder="Enter title"
                          value={curriculumFormData[index].title}
                          onChange={(event) => handleChange(event, index)}
                          className={`min-w-96 ${
                            form.formState.errors?.curriculum?.[index]?.title
                              ? "border-red-600"
                              : ""
                          }`}
                        />
                        {form.formState.errors?.curriculum?.[index]?.title && (
                          <p className="text-red-500 text-sm">
                            {
                              form.formState.errors.curriculum[index].title
                                .message
                            }
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={"freepreview"}>Free Priview</Label>
                        <Switch
                          checked={curriculumFormData[index].freePreview}
                          id="freepreview"
                          name="freepreview"
                          onCheckedChange={(value) =>
                            handleChange("", index, value)
                          }
                        />
                      </div>
                    </div>

                    {/* Video Upload and show ------------------------------ */}
                    <div>
                      {curriculumFormData[index].videoUrl ? (
                        <div className=" space-y-4">
                          <div className="w-1/3">
                            <VideoPlayer
                              width="640px"
                              height="360px"
                              url={curriculumFormData[index].videoUrl}
                            />
                          </div>
                          <div className="flex gap-3">
                            <Button
                              onClick={() => handleReplaceVideo(index)}
                              size={"sm"}
                            >
                              Replace Lecture
                            </Button>
                            <Button
                              onClick={() => handleDeleteLecture(index)}
                              size={"sm"}
                              className={"bg-red-900"}
                            >
                              Delete Lecture
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Label
                            htmlFor={`video${index + 1}`}
                            className={`${
                              form.formState.errors?.curriculum?.[index]
                                ?.videoUrl
                                ? "text-red-600"
                                : ""
                            }`}
                          >
                            Video
                          </Label>
                          <Input
                            id={`video${index + 1}`}
                            type={"file"}
                            accept="video/*"
                            onChange={(event) => handleFileChange(event, index)}
                            className={`${
                              form.formState.errors?.curriculum?.[index]
                                ?.videoUrl
                                ? "border-red-600"
                                : ""
                            }`}
                          />
                          {form.formState.errors?.curriculum?.[index]
                            ?.videoUrl && (
                            <p className="text-red-500 text-sm">
                              {
                                form.formState.errors.curriculum[index].videoUrl
                                  .message
                              }
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCorriculum;
