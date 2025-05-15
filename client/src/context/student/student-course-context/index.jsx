import {
  fetchCourseDetailsService,
  fetchFilterCourseService,
} from "@/service/student/student-course";
import { fetchMyCourseSevice } from "@/service/student/student-order-course";
import { createContext, useState } from "react";
export const StudentCourseContext = createContext(null);

function StudentCourseContextProvider({ children }) {
  // const navigate = useNavigate();
  const [courseFilterList, setCourseFilterList] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [myCourseList, setMyCourseList] = useState([]);
  const [progressCourseDetails, setProgressCourseDetails] = useState(null);

  const [loading, setLoading] = useState(false);

  async function fetchMyCourseList() {
    setLoading(true);
    const result = await fetchMyCourseSevice();
    if (result.success) {
      setMyCourseList(result.data);
      setLoading(false);
    } else {
      setMyCourseList([]);
      setLoading(false);
    }
  }

  async function fetchCourseDetailsData(courseId) {
    setLoading(true);
    const result = await fetchCourseDetailsService(courseId);
    if (result.success) {
      setCourseDetails(result.data);
      setLoading(false);
    } else {
      setCourseDetails(null);
      setLoading(false);
    }
  }

  async function fetchData(filter, sort) {
    setLoading(true);
    const result = await fetchFilterCourseService(filter, sort);
    if (result.success) {
      setCourseFilterList(result.data);
      setLoading(false);
    } else {
      setLoading(false);
      setCourseFilterList([]);
    }
  }
  return (
    <StudentCourseContext.Provider
      value={{
        courseFilterList,
        loading,
        fetchData,
        courseDetails,
        fetchCourseDetailsData,
        myCourseList,
        fetchMyCourseList,
        progressCourseDetails,
        setProgressCourseDetails,
        setLoading,
      }}
    >
      {children}
    </StudentCourseContext.Provider>
  );
}

export default StudentCourseContextProvider;
