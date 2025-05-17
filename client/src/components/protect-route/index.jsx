import { Navigate, useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import HashLoaderProvider from "../common/HashLoader";

function ProtectRoute({ isAuthenticated, user, loading, children }) {
  const location = useLocation();

  if (loading) {
    return <HashLoaderProvider />;
  }

  if (!isAuthenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"} />;
  }

  if (
    isAuthenticated &&
    user.role === "user" &&
    (location.pathname.includes("/auth") ||
      location.pathname.includes("instructor"))
  ) {
    return <Navigate to={"/home"} />;
  }

  if (
    isAuthenticated &&
    user.role === "instructor" &&
    (location.pathname.includes("/auth") || location.pathname === "/")
  ) {
    return <Navigate to={"/instructor/dashboard"} />;
  }

  return <>{children}</>;
}

export default ProtectRoute;
