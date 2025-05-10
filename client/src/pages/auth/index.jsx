import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import SignUp from "@/components/auth/signup";
import SignIn from "@/components/auth/signin";
function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");

  function handleTabChange(value) {
    setActiveTab(value);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 md:px-8 border h-14 flex items-center fixed w-full left-0">
        <Link to={"/"} className="flex justify-center items-center gap-4">
          <GraduationCap className="h-8 w-8" />
          <span className="font-extrabold text-lg"> LMS LEARN</span>
        </Link>
      </header>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-[370px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <SignIn setActiveTab={setActiveTab} />
          </TabsContent>
          <TabsContent value="signup">
            <SignUp setActiveTab={setActiveTab} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;
