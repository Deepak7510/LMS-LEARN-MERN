import HashLoaderProvider from "@/components/common/HashLoader";
import VideoPlayer from "@/components/common/video-player";
import BuyCourseHandler from "@/components/student-view/buy-course-handler";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { StudentCourseContext } from "@/context/student/student-course-context";
import { checkCurseBuyStatusService } from "@/service/student/student-order-course";
import {
  BadgeCheck,
  Calendar,
  Globe,
  Lock,
  PlayIcon,
  UserRoundPen,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const decodeHTML = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  return doc.body.innerHTML;
};
function StudentCourseDetailsPage() {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [coursePreviewData, setCoursePreviewData] = useState(null);
  const { courseId } = useParams();

  const navigate = useNavigate();
  const {
    loading: courseDetailsLoading,
    courseDetails,
    fetchCourseDetailsData,
  } = useContext(StudentCourseContext);

  useEffect(() => {
    fetchCourseDetailsData(courseId);
  }, [courseId]);

  useEffect(() => {
    checkCurseBuyStatusService(courseId).then((result) => {
      if (result.success) {
        if (result.data.status) {
          return navigate(`/course-progress/${courseId}`);
        }
      }
    });
  }, [courseId]);

  const freePreviewDataIndex =
    courseDetails !== null
      ? courseDetails?.curriculum.findIndex((item) => {
          return item.freePreview;
        })
      : -1;

  function handlePreview(videoUrl, LectureNo, title) {
    setOpenPreviewDialog(true);
    setCoursePreviewData({ videoUrl, LectureNo, title });
  }

  return (
    <div>
      {courseDetailsLoading ? (
        <HashLoaderProvider />
      ) : courseDetails == null ? (
        <div className="flex justify-center h-screen items-center">
          <div className="text-2xl font-extrabold">Course Details found !</div>
        </div>
      ) : (
        <div>
          <div className="bg-zinc-950 px-6 md:px-40 py-18 md:py-20 space-y-3 md:space-y-5">
            <div className="font-semibold text-purple-300">
              <span> {courseDetails?.category.name}</span>
              <span>{">"}</span>
              <span>{courseDetails?.level.name}</span>
            </div>
            <h1 className="text-white text-2xl md:text-4xl font-semibold">
              {courseDetails?.title}
            </h1>
            <h2 className="text-white textt-lg md:text-xl font-medium">
              {courseDetails?.subTitle}
            </h2>
            <p className="text-white text-xs md:text-base">
              Created by{" "}
              <span className="text-purple-400">
                {courseDetails?.instructor.username}
              </span>
            </p>

            <div className="text-white flex gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-3 w-3 md:h-5 md:w-5" />
                <span className="text-xs md:text-base">
                  Last Update :{" "}
                  {new Date(courseDetails?.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-3 w-3 md:h-5 md:w-5" />
                <span className="text-xs md:text-base">
                  {courseDetails?.primaryLanguage?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserRoundPen className="h-3 w-3 md:h-5 md:w-5" />
                <span className="text-xs md:text-base">
                  {courseDetails?.students?.length}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 px-2 md:px-40 py-6 md:py-10 space-y-2 md:space-y-5">
            <main className="w-full md:w-1/2 space-y-3 md:space-y-5">
              <Card
                className={
                  "gap-1 shadow-sm border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800"
                }
              >
                <CardHeader>
                  <CardTitle className={"text-lg font-medium"}>
                    What you will learn ?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <span>
                      {courseDetails.objectives
                        .split(",")
                        .map((item, index) => {
                          return (
                            <li key={index} className="flex gap-2">
                              <BadgeCheck className="h-4 w-4 text-green-700" />
                              <span> {item}</span>
                            </li>
                          );
                        })}
                    </span>
                  </ul>
                </CardContent>
              </Card>
              <Card
                className={
                  "gap-1  bg-gray-50 border-purple-200 dark:border-purple-800 dark:bg-purple-900/20"
                }
              >
                <CardHeader>
                  <CardTitle className={"text-lg font-medium"}>
                    Course Curriculum
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul>
                    {courseDetails.curriculum.map((item, index) => {
                      return (
                        <li
                          onClick={() =>
                            item.freePreview
                              ? handlePreview(
                                  item.videoUrl,
                                  index + 1,
                                  item.title
                                )
                              : null
                          }
                          key={item.public_id}
                          className={`flex items-center gap-2 ${
                            item.freePreview
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                        >
                          {item.freePreview ? (
                            <PlayIcon className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                          <span>{item.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
              <Card
                className={
                  " gap-1 bg-blue-50 border-blue-200 dark:border-blue-800 dark:bg-blue-900/20"
                }
              >
                <CardHeader>
                  <CardTitle className={"text-lg font-medium"}>
                    Course Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(courseDetails.description),
                    }}
                  ></div>
                </CardContent>
              </Card>
            </main>
            <aside className="w-full md:w-1/2">
              <Card
                className={
                  "gap-3  py-2 bg-gray-50 border-gray-200 dark:border-gray-800 dark:bg-gray-900/20"
                }
              >
                <CardHeader>
                  <CardTitle className={"text-lg font-medium"}>
                    Lecture 1:{" "}
                    {freePreviewDataIndex !== -1
                      ? courseDetails.curriculum[freePreviewDataIndex].title
                      : ""}
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className={"px-3"}>
                  <VideoPlayer
                    height="300px"
                    width="100%"
                    url={
                      freePreviewDataIndex !== -1
                        ? courseDetails.curriculum[freePreviewDataIndex]
                            .videoUrl
                        : ""
                    }
                  />
                  <h1 className="text-xl font-bold my-4">
                    ₹ {courseDetails.pricing}
                  </h1>

                  <BuyCourseHandler courseDetails={courseDetails} />
                </CardContent>
              </Card>
            </aside>
          </div>
          <Dialog
            open={openPreviewDialog}
            onOpenChange={() => {
              setOpenPreviewDialog(false);
              setCoursePreviewData(null);
            }}
          >
            <DialogContent aria-describedby={undefined}>
              <DialogHeader>
                <DialogTitle className={"font-extrabold"}>
                  Courese preview
                </DialogTitle>
                <DialogTitle>
                  Lecture {coursePreviewData?.LectureNo} :{" "}
                  {coursePreviewData?.title}
                </DialogTitle>
              </DialogHeader>
              <div>
                <VideoPlayer
                  width="100%"
                  height="300px"
                  url={coursePreviewData?.videoUrl}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}

export default StudentCourseDetailsPage;
