import { useContext } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth";
import ProtectRoute from "./components/protect-route";
import { AuthContext } from "./context/auth-context";
import StudentLayout from "./components/student-view/common/layout";
import StudentHomePage from "./pages/student/home";
import NotFoundPage from "./pages/not-found";
import InstructorCourseCategoryPage from "./pages/instructor/course-category";
import InstructorDashboardPage from "./pages/instructor/dashboard";
import InstructorCourseLevelPage from "./pages/instructor/course-level";
import InstructorAddCoursePage from "./pages/instructor/add-new-courses";
import InstructorCoursePage from "./pages/instructor/courses";
import InstructorCourseLanguagePage from "./pages/instructor/course-language";
import InstructorLayout from "./components/instructor-view/common/layout";
import StudentCoursePage from "./pages/student/courses";
import StudentCourseDetailsPage from "./pages/student/course-details";
import StudentMyCoursesPage from "./pages/student/my-courses";
import StudentCourseProgressPage from "./pages/student/course-progress";
import StudentAboutUsPage from "./pages/student/aboutus";
import StudentContactPage from "./pages/student/contact";

function App() {
  const {
    authData: { isAuthenticated, user },
    loading,
  } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          <ProtectRoute
            isAuthenticated={isAuthenticated}
            user={user}
            loading={loading}
          >
            <AuthPage />
          </ProtectRoute>
        }
      ></Route>

      <Route
        path="/"
        element={
          <ProtectRoute
            isAuthenticated={isAuthenticated}
            user={user}
            loading={loading}
          >
            <StudentLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<StudentHomePage />} />
        <Route index path="home" element={<StudentHomePage />} />
        <Route index path="courses" element={<StudentCoursePage />} />
        <Route index path="/about-us" element={<StudentAboutUsPage />} />
        <Route index path="/contact" element={<StudentContactPage />} />

        <Route
          index
          path="course-details/:courseId"
          element={<StudentCourseDetailsPage />}
        />
        <Route index path="my-courses" element={<StudentMyCoursesPage />} />
        <Route
          index
          path="course-progress/:courseId"
          element={<StudentCourseProgressPage />}
        />
      </Route>

      <Route
        path="/instructor"
        element={
          <ProtectRoute
            isAuthenticated={isAuthenticated}
            user={user}
            loading={loading}
          >
            <InstructorLayout />
          </ProtectRoute>
        }
      >
        <Route index element={<InstructorDashboardPage />} />
        <Route path="dashboard" element={<InstructorDashboardPage />} />
        <Route
          path="course-category"
          element={<InstructorCourseCategoryPage />}
        />
        <Route path="course-level" element={<InstructorCourseLevelPage />} />
        <Route
          path="course-language"
          element={<InstructorCourseLanguagePage />}
        />
        <Route path="courses" element={<InstructorCoursePage />} />
        <Route path="add-new-course" element={<InstructorAddCoursePage />} />
        <Route path="edit-course/:id" element={<InstructorAddCoursePage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
