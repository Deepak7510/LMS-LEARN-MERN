import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

function MyCourseTile({ courseDetails }) {
  const navigate = useNavigate();
  return (
    <Card className={"py-4 shadow-none"}>
      <CardContent className={"px-4 space-y-1"}>
        <div className="w-full h-52 rounded-lg overflow-hidden">
          <img
            src={courseDetails.image?.image_url}
            className="h-full w-full object-cover"
            alt=""
          />
        </div>
        <div>
          <h1 className={"font-semibold text-lg"}>{courseDetails.title}</h1>
          <p className={"text-gray-600 text-base"}>
            {courseDetails?.instructor?.username}
          </p>
          {/* <p className="font-semibold text-lg">₹ {courseDetails.pricing}</p> */}
        </div>
        <Button
          onClick={() => navigate(`/course-progress/${courseDetails._id}`)}
          className={"w-full cursor-pointer"}
        >
          Start Watching
        </Button>
      </CardContent>
    </Card>
  );
}

export default MyCourseTile;
