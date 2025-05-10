import { fetchAllCourse } from "@/service/course";
import { createContext, useState } from "react";

export const CourseContext = createContext(null);

export function CourseContextProvider({ children }) {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    setLoading(true);
    const result = await fetchAllCourse();
    if (result.success) {
      setCourseList([...result.data]);
      setLoading(false);
    } else {
      setCourseList([]);
      setLoading(false);
    }
  }

  return (
    <CourseContext.Provider value={{ courseList, loading, fetchData }}>
      {children}
    </CourseContext.Provider>
  );
}
