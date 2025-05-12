import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function MyCourseTileSkeleton() {
  return (
    <Card className="py-4 shadow-none">
      <CardContent className="px-4 space-y-2">
        {/* Image Skeleton */}
        <div className="w-full h-52 rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-6 w-3/4 mt-2" />

        {/* Instructor name */}
        <Skeleton className="h-4 w-1/2" />

        {/* Price */}
        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
}

export default MyCourseTileSkeleton;
