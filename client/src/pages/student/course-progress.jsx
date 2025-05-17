import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  fetchCourseProgressService,
  markCurrentCourseProgressService,
  resetCourseProgressService,
} from "@/service/student/course-progress";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { Label } from "@/components/ui/label";
import { Check, Play } from "lucide-react";
import { toast } from "sonner";
import { StudentCourseContext } from "@/context/student/student-course-context";
import VideoPlayer from "@/components/common/video-player";
import HashLoaderProvider from "@/components/common/HashLoader";

function StudentCourseProgressPage() {
  const {
    loading: courseProgressLoading,
    setLoading,
    progressCourseDetails,
    setProgressCourseDetails,
  } = useContext(StudentCourseContext);

  const navigate = useNavigate();
  const { courseId } = useParams();
  const [lockCourse, setLockCourse] = useState(true);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [showComplateDialog, setShowComplateDialog] = useState(false);

  async function fetchCourseProgress(courseId) {
    setLoading(true);
    const result = await fetchCourseProgressService(courseId);
    if (result.success) {
      if (result?.data?.courseDetails) {
        setProgressCourseDetails({
          courseDetails: result?.data?.courseDetails,
          progress: result?.data?.progress,
        });
        setCurrentLecture(result?.data?.courseDetails?.curriculum[0]);
      }
      setLockCourse(result?.data?.isBuy);
      if (result?.data?.complated) {
        setCurrentLecture(result?.data?.courseDetails?.curriculum[0]);
        setShowComplateDialog(result?.data?.complated);
      }
      setLoading(false);
    } else {
      setProgressCourseDetails(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCourseProgress(courseId);
  }, [courseId]);

  useEffect(() => {
    if (lockCourse === false) {
      setTimeout(() => {
        navigate(`/course-details/${courseId}`);
      }, 3000);
    }
  }, [lockCourse]);

  async function markCurrentCourseProgres(getcourseId, getlectureId) {
    const result = await markCurrentCourseProgressService(
      getcourseId,
      getlectureId
    );
    if (result.success) {
      setProgressCourseDetails({
        ...progressCourseDetails,
        progress: result?.data?.lectureProgress,
      });
      if (result?.data?.completed) {
        setShowComplateDialog(result?.data?.completed);
      }
    }
  }

  useEffect(() => {
    if (currentLecture && currentLecture.progressValue === 1) {
      const index = progressCourseDetails?.courseDetails?.curriculum.findIndex(
        (item) => item._id === currentLecture._id
      );
      if (index + 1 < progressCourseDetails?.courseDetails?.curriculum.length) {
        setCurrentLecture(
          progressCourseDetails?.courseDetails?.curriculum[index + 1]
        );
      }
      markCurrentCourseProgres(courseId, currentLecture._id);
    }
  }, [currentLecture]);

  async function handleReset() {
    const result = await resetCourseProgressService(courseId);
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      if (!result?.data?.complated) {
        setShowComplateDialog(result?.data?.complated);
        setProgressCourseDetails({
          ...progressCourseDetails,
          progress: result.data?.lectureProgress || [],
        });
        setCurrentLecture(progressCourseDetails.courseDetails.curriculum[0]);
      }
    }
  }

  return (
    <div className="w-full">
      {courseProgressLoading ? (
        <HashLoaderProvider />
      ) : (
        <div>
          <Dialog open={!lockCourse}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  You can't watch this course without purchasing
                </DialogTitle>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          {showComplateDialog ? (
            <Confetti className="h-screen w-screen" />
          ) : null}
          <Dialog open={showComplateDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Congratulations</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                You have completed the course
              </DialogDescription>
              <div className="flex gap-3">
                <Button onClick={() => navigate("/my-courses")}>
                  My course page
                </Button>
                <Button onClick={handleReset}>Rewatch Course</Button>
              </div>
            </DialogContent>
          </Dialog>
          {progressCourseDetails ? (
            <div className="py-18 px-2 lg:px-20 min-h-screen bg-zinc-950">
              <Button
                onClick={() => navigate("/my-courses")}
                className={"mb-2"}
                variant={"outline"}
              >
                Go to my courses page
              </Button>
              {/* <Separator /> */}
              <div className="grid grid-col-1  lg:grid-cols-3 h-full mt-2 gap-4">
                <div className="lg:col-span-2 h-auto">
                  <div className="border rounded-xl overflow-hidden">
                    <VideoPlayer
                      url={currentLecture?.videoUrl}
                      height={
                        window.innerWidth < 700
                          ? "300px"
                          : window.innerWidth / 3
                      }
                      width="100%"
                      onUpdateProgress={setCurrentLecture}
                      currentLecture={currentLecture}
                    />
                  </div>
                  <h1 className="text-white text-xl font-semibold mt-4">
                    {currentLecture?.title}
                  </h1>
                </div>
                <div className="lg:col-span-1 text-white border rounded-xl">
                  <div className="p-4">
                    <h1 className="text-2xl font-extrabold">Lectures</h1>
                    <div className="space-y-2">
                      {progressCourseDetails.courseDetails?.curriculum.map(
                        (item, index) => {
                          return (
                            <Label
                              key={item._id}
                              onClick={() => setCurrentLecture(item)}
                              className={
                                "text-base cursor-pointer flex items-center"
                              }
                            >
                              {progressCourseDetails.progress.find(
                                (progressItem) =>
                                  progressItem.lectureId === item._id
                              )?.viewed ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                              <span>
                                {index + 1} . {item.title}
                              </span>
                            </Label>
                          );
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center h-screen items-center">
              <div className="text-2xl font-extrabold">
                Course Details found !
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentCourseProgressPage;
