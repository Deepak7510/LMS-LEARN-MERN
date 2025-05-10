import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function CourseCardTile({ courseDetails }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/course-details/${courseDetails._id}`)}
      className={"py-4 shadow-none cursor-pointer"}
    >
      <CardContent className={"px-4 space-y-2"}>
        <div className="w-full h-52 rounded-lg overflow-hidden">
          <img
            src={courseDetails.image.image_url}
            className="h-full w-full object-cover"
            alt="course-image"
          />
        </div>
        <div>
          <h1 className={"font-semibold text-lg"}>{courseDetails.title}</h1>
          <p className={"text-gray-600 text-base"}>
            {courseDetails?.instructor?.username}
          </p>
          <p className="font-semibold text-lg">₹ {courseDetails.pricing}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCardTile;
