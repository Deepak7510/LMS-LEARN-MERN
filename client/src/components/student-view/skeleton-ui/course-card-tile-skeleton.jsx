import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardTileSkeletonDemo() {
  return (
    <Card className="py-2.5 shadow-none">
      <CardContent className="px-2.5 space-y-2">
        {/* Image Skeleton */}
        <div className="w-full  h-44 md:h-40 rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4 mt-2" />

        {/* Instructor name */}
        <Skeleton className="h-3.5 w-1/2" />

        {/* Price */}
        <Skeleton className="h-5 w-1/4" />
      </CardContent>
    </Card>
  );
}
