import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function CourseCardTile({ courseDetails }) {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/course-details/${courseDetails._id}`)}
      className={"py-2.5 shadow-lg cursor-pointer"}
    >
      <CardContent className={"px-2.5 space-y-2"}>
        <div className="w-full h-44 md:h-40 rounded-lg overflow-hidden">
          <img
            loading="lazy"
            src={courseDetails.image.image_url}
            className="h-full w-full object-cover"
            alt="course-image"
          />
        </div>
        <div>
          <h1 className={"font-semibold text-[1.03rem] line-clamp-1"}>
            {courseDetails.title}
          </h1>
          <p className={"text-gray-600 text-sm"}>
            {courseDetails?.instructor?.username}
          </p>
          <p className="font-semibold text-lg">₹ {courseDetails.pricing}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCardTile;
