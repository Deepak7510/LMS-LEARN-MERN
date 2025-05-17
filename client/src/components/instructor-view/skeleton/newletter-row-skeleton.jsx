import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

function NewsLetterTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell className="flex gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
      </TableCell>
    </TableRow>
  );
}

export default NewsLetterTableRowSkeleton;
