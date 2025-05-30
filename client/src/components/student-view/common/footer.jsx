import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { instructorCreateNewsLetterService } from "@/service/student/news-letter";
import { toast } from "sonner";

const formSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email provider"),
});
export default function StudentFooter() {
  const location = useLocation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData) {
    const result = await instructorCreateNewsLetterService(formData);
    if (result.success) {
      toast.success(result.message);
      form.reset();
    } else {
      toast.error(result.message);
      form.reset();
    }
  }

  return (
    <footer className="bg-zinc-950 text-gray-300 py-6 border-t-2">
      <div className="px-6 md:px-20 grid md:grid-cols-4 sm:grid-cols-2 gap-6 md:gap-20">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-white">LMS LEARN</h2>
          <p className="text-sm mt-3 text-gray-400 leading-relaxed">
            Learn Web helps you master modern web development through hands-on
            training and real-world projects. Gain practical skills in HTML,
            CSS, JavaScript, and more with expert-led courses. Learn at your own
            pace, build portfolio-worthy projects, and join thousands of
            learners transforming their careers with industry-ready knowledge.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <div
                className="cursor-pointer"
                onClick={() => {
                  location.pathname.includes("/courses")
                    ? null
                    : navigate("/courses");
                }}
              >
                Courses
              </div>
            </li>
            <li>
              <Link to={"/my-courses"}>My Courses</Link>
            </li>
            <li>
              <Link to={"/about-us"}>About us</Link>
            </li>
            <li>
              <Link to={"/contact"}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
          <p className="text-sm text-gray-400 mb-2">
            Email: deepakkumaryadav75100@gmail.com
          </p>
          <p className="text-sm text-gray-400 mb-2">Phone: +91 7510064500</p>
          <p className="text-sm text-gray-400">Address: Balrampur, India</p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Join Our Newsletter
          </h3>
          <p className="text-sm text-gray-400 mb-2">
            Get latest updates & free tips!
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex items-start gap-2 mt-3"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Your email"
                        className="bg-gray-800 border-gray-700 text-white"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="bg-white text-black hover:bg-gray-200">
                Subscribe
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Social Icons */}
      <div className="mt-10 text-center">
        <div className="flex justify-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Facebook className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Twitter className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Instagram className="w-5 h-5 text-white" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-white/10 transition-colors"
          >
            <Youtube className="w-5 h-5 text-white" />
          </Button>
        </div>
      </div>

      <Separator className="my-7 bg-gray-700" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Learn Web. All rights reserved.
      </p>
    </footer>
  );
}
