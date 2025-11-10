import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import ProtectRoute from "./components/protect-route";
import ScrollToTop from "./components/common/ScrollToTop";
import HashLoaderProvider from "./components/common/HashLoader";
import NotFoundPage from "./pages/not-found";
import { AuthContext } from "./context/auth-context";

// ===== Lazy Imports ===== //
const AuthPage = React.lazy(() => import("./pages/auth"));

// ---- Student ---- //
const StudentLayout = React.lazy(() =>
  import("./components/student-view/common/layout")
);
const StudentHomePage = React.lazy(() => import("./pages/student/home"));
const StudentContactPage = React.lazy(() => import("./pages/student/contact"));
const StudentCoursePage = React.lazy(() => import("./pages/student/courses"));
const StudentCourseDetailsPage = React.lazy(() =>
  import("./pages/student/course-details")
);
const StudentMyCoursesPage = React.lazy(() =>
  import("./pages/student/my-courses")
);
const StudentCourseProgressPage = React.lazy(() =>
  import("./pages/student/course-progress")
);
const StudentAboutUsPage = React.lazy(() => import("./pages/student/aboutus"));

// ---- Instructor ---- //
const InstructorLayout = React.lazy(() =>
  import("./components/instructor-view/common/layout")
);
const InstructorDashboardPage = React.lazy(() =>
  import("./pages/instructor/dashboard")
);
const InstructorCourseCategoryPage = React.lazy(() =>
  import("./pages/instructor/course-category")
);
const InstructorCourseLevelPage = React.lazy(() =>
  import("./pages/instructor/course-level")
);
const InstructorCourseLanguagePage = React.lazy(() =>
  import("./pages/instructor/course-language")
);
const InstructorCoursePage = React.lazy(() =>
  import("./pages/instructor/courses")
);
const InstructorAddCoursePage = React.lazy(() =>
  import("./pages/instructor/add-new-courses")
);
const InstructorMessagePage = React.lazy(() =>
  import("./pages/instructor/message")
);
const InstructorNewsLetterPage = React.lazy(() =>
  import("./pages/instructor/news-letter")
);

// ===================================================== //

function App() {
  const {
    authData: { isAuthenticated, user },
    loading,
  } = useContext(AuthContext);

  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<HashLoaderProvider />}>
        <Routes>
          {/* ===== Auth Route ===== */}
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
          />

          {/* ===== Student Routes ===== */}
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
            <Route path="home" element={<StudentHomePage />} />
            <Route path="courses" element={<StudentCoursePage />} />
            <Route path="about-us" element={<StudentAboutUsPage />} />
            <Route path="contact" element={<StudentContactPage />} />
            <Route
              path="course-details/:courseId"
              element={<StudentCourseDetailsPage />}
            />
            <Route path="my-courses" element={<StudentMyCoursesPage />} />
            <Route
              path="course-progress/:courseId"
              element={<StudentCourseProgressPage />}
            />
          </Route>

          {/* ===== Instructor Routes ===== */}
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
            <Route
              path="course-level"
              element={<InstructorCourseLevelPage />}
            />
            <Route
              path="course-language"
              element={<InstructorCourseLanguagePage />}
            />
            <Route path="courses" element={<InstructorCoursePage />} />
            <Route
              path="add-new-course"
              element={<InstructorAddCoursePage />}
            />
            <Route
              path="edit-course/:id"
              element={<InstructorAddCoursePage />}
            />
            <Route path="message" element={<InstructorMessagePage />} />
            <Route path="newsletter" element={<InstructorNewsLetterPage />} />
          </Route>

          {/* ===== 404 Page ===== */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
