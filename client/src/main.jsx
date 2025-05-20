import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth-context";
import { Toaster } from "@/components/ui/sonner";
import CategoryContextProvider from "./context/instructor/category-context";
import LevelContextProvider from "./context/instructor/level-context";
import LanguageContextProvider from "./context/instructor/language-context";
import { CourseContextProvider } from "./context/instructor/course-context";
import StudentCourseContextProvider from "./context/student/student-course-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import InstructorMessageContextProvider from "./context/instructor/message-context";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoryContextProvider>
          <LevelContextProvider>
            <LanguageContextProvider>
              <CourseContextProvider>
                <StudentCourseContextProvider>
                  <InstructorMessageContextProvider>
                    <App />
                    <Toaster />
                  </InstructorMessageContextProvider>
                </StudentCourseContextProvider>
              </CourseContextProvider>
            </LanguageContextProvider>
          </LevelContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
