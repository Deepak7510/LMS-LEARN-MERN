import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import useFetch from "@/hooks/useFetch";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

function FilterCoursesSidebar({ filter, handleFilter }) {
  const { data: categoryList } = useFetch("/api/student/category/fetch-active");
  const { data: levelList } = useFetch("/api/student/level/fetch-active");
  const { data: languageList } = useFetch("/api/student/language/fetch-active");
  return (
    <Sidebar className={"absolute z-0 py-6 top-0 left-0"}>
      <div className="mt-10 mb-2 ps-3">
        <h1 className="text-xl font-extrabold">All Courses</h1>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md"}>Category</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categoryList &&
                categoryList.length > 0 &&
                categoryList?.map((item) => (
                  <SidebarMenuItem key={item._id}>
                    <SidebarMenuButton asChild>
                      <div>
                        <Checkbox
                          id={item.slug}
                          className={"cursor-pointer"}
                          checked={
                            filter &&
                            Object.keys(filter).length > 0 &&
                            filter["category"]?.indexOf(item._id) > -1
                          }
                          onCheckedChange={(_) => {
                            handleFilter("category", item._id);
                          }}
                        />
                        <Label className={"cursor-pointer"} htmlFor={item.slug}>
                          {item.name}
                        </Label>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md"}>Level</SidebarGroupLabel>
          <SidebarGroupContent className={""}>
            <SidebarMenu>
              {levelList &&
                levelList.length > 0 &&
                levelList?.map((item) => (
                  <SidebarMenuItem key={item._id}>
                    <SidebarMenuButton asChild>
                      <div>
                        <Checkbox
                          checked={
                            filter &&
                            Object.keys(filter).length > 0 &&
                            filter["level"]?.indexOf(item._id) > -1
                          }
                          onCheckedChange={(_) => {
                            handleFilter("level", item._id);
                          }}
                        />
                        <Label>{item.name}</Label>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className={"text-md"}>Language</SidebarGroupLabel>
          <SidebarGroupContent className={""}>
            <SidebarMenu>
              {languageList &&
                languageList.length > 0 &&
                languageList?.map((item) => (
                  <SidebarMenuItem key={item._id}>
                    <SidebarMenuButton asChild>
                      <div>
                        <Checkbox
                          checked={
                            filter &&
                            Object.keys(filter).length > 0 &&
                            filter["language"]?.indexOf(item._id) > -1
                          }
                          onCheckedChange={(_) => {
                            handleFilter("language", item._id);
                          }}
                        />
                        <Label>{item.name}</Label>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default FilterCoursesSidebar;
