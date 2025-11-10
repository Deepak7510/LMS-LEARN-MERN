import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signinUserService } from "@/service/auth";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
const formSchema = z.object({
  emailOrUsername: z.string().nonempty("Email or username is required."),
  password: z.string().nonempty("Password is required"),
});

function SignIn() {
  const { setAuthData } = useContext(AuthContext);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const result = await signinUserService(data);
    if (result.success) {
      sessionStorage.setItem(
        "accessToken",
        JSON.stringify(result.data.accessToken)
      );
      setAuthData({
        isAuthenticated: true,
        user: result.data.user,
      });
      toast.success(result.message);
      form.reset();
    } else {
      toast.error(result.message);
      setAuthData({
        isAuthenticated: false,
        user: null,
      });
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to access your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emailOrUsername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Or Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email Or username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className={"w-full"} type="submit">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignIn;
