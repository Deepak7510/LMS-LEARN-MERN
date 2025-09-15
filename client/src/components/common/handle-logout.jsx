import { AuthContext } from "@/context/auth-context";
import { logoutUserService } from "@/service/auth";
import { useContext } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function HandleLogout({ children }) {
  const { checkAuthUser } = useContext(AuthContext);
  async function handleLogout() {
    const result = await logoutUserService();
    if (result.success) {
      toast.success(result.message);
      sessionStorage.clear();
      await checkAuthUser();
    } else {
      toast.error(result.message);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to Logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be Signed out of your account. You can Sign in again
            anytime.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default HandleLogout;
