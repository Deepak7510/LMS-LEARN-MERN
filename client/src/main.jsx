import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/auth-context";
import { Toaster } from "@/components/ui/sonner";
import CategoryContextProvider from "./context/category-context";
import LevelContextProvider from "./context/level-context";
import LanguageContextProvider from "./context/language-context";
import { CourseContextProvider } from "./context/course-context";
import StudentCourseContextProvider from "./context/student-course-context";
import { ThemeProvider } from "@/components/theme/theme-provider";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthContextProvider>
        <CategoryContextProvider>
          <LevelContextProvider>
            <LanguageContextProvider>
              <CourseContextProvider>
                <StudentCourseContextProvider>
                  <App />
                  <Toaster />
                </StudentCourseContextProvider>
              </CourseContextProvider>
            </LanguageContextProvider>
          </LevelContextProvider>
        </CategoryContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </ThemeProvider>
);
