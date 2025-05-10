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
import { signupUser } from "@/service/auth";
import { toast } from "sonner";
const formSchema = z.object({
  username: z.string().nonempty("Username is required.").min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email format."),
  password: z.string().nonempty("password is required").min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

function SignUp({ setActiveTab }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const result = await signupUser(data);
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      form.reset();
      setActiveTab("signin");
    } else {
      toast.error(result.message);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to sign up and start your journey with us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
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
                    <Input
                      type={"password"}
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={form.formState.isSubmitting}
              type="submit"
              className={"w-full"}
            >
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default SignUp;
