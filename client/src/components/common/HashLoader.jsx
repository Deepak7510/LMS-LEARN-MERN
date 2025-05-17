import { HashLoader } from "react-spinners";
import { useTheme } from "../theme/theme-provider";

function HashLoaderProvider() {
  const { theme } = useTheme();
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <HashLoader color={theme === "light" ? "#000000" : "#ffffff"} />
    </div>
  );
}

export default HashLoaderProvider;
