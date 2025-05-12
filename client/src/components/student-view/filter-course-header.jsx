import { AlignJustify, ArrowUpDown, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { DropdownMenuRadioItem } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "../theme/theme-provider";

function FilterCourseHeader({ sort, setSort }) {
  const { toggleSidebar } = useSidebar();

  function handleSort(getSortValue) {
    setSort(getSortValue);
  }
  const { theme } = useTheme();

  return (
    <header
      className={`${
        theme === "dark" ? "bg-zinc-950" : theme === "light" ? "bg-white" : ""
      } py-2 px-6 border-b-2 h-12 flex sticky top-0 justify-between md:justify-end`}
    >
      <Button
        variant={"outline"}
        size={"sm"}
        className={"rounded-full w-24 md:hidden"}
        onClick={toggleSidebar}
        asChild
      >
        <div className="flex gap-2">
          <span> filter</span>
          <Filter />
        </div>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-24 cursor-pointer" asChild>
          <Button variant={"outline"} size={"sm"}>
            <ArrowUpDown />
            <span>Sort</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => handleSort(value)}
          >
            {sortOptions &&
              sortOptions.length > 0 &&
              sortOptions.map((item) => {
                return (
                  <DropdownMenuRadioItem
                    className="cursor-pointer p-1"
                    key={item.id}
                    value={item.id}
                  >
                    {item.label}
                  </DropdownMenuRadioItem>
                );
              })}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

export default FilterCourseHeader;
