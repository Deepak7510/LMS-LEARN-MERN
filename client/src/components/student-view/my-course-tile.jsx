import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

function MyCourseTile({ courseDetails }) {
  const navigate = useNavigate();
  return (
    <Card className={"py-2.5 shadow-none"}>
      <CardContent className={"px-2.5 space-y-1"}>
        <div className="w-full h-44 md:h-40 rounded-lg overflow-hidden">
          <img
            src={courseDetails.image?.image_url}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div>
          <h1 className={"font-semibold text-[1.03rem] line-clamp-1"}>
            {courseDetails.title}
          </h1>
          <p className={"text-gray-600 text-sm"}>
            {courseDetails?.instructor?.username}
          </p>
          {/* <p className="font-semibold text-lg">₹ {courseDetails.pricing}</p> */}
        </div>
        <Button
          size={"sm"}
          onClick={() => navigate(`/course-progress/${courseDetails._id}`)}
          className={"w-full"}
        >
          Start Watching
        </Button>
      </CardContent>
    </Card>
  );
}

export default MyCourseTile;
