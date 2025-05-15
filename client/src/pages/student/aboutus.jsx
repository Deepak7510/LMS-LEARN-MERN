import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StudentAboutUsPage() {
  return (
    <div className="sm:px-6 lg:px-10 xl:px-28 py-20">
      <section className="py-10 px-6 text-center">
        <h1 className="text-5xl font-bold">
          Welcome to where possibilities begin
        </h1>
        {/* <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4" alt="Learning" className="mx-auto mt-10 w-full max-w-3xl rounded-xl shadow-lg"> */}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 justify-center py-15 px-4 gap-8">
        <div>
          <h1 className="text-3xl font-bold">Empowering Learning Everywhere</h1>
          <p className="text-base">
            We’re on a mission to connect people through knowledge and help them
            grow in their careers, one course at a time.
          </p>
        </div>
        <div>
          <h1 className="text-3xl font-bold">
            Skills are the key to unlocking potential
          </h1>
          <p className="text-base">
            Whether you want to learn a new skill, train your teams, or share
            what you know with the world, you’re in the right place. As a leader
            in online learning, we’re here to help you achieve your goals and
            transform your life.
          </p>
        </div>
      </section>

      <section>
        <Card className="py-20 bg-blue-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="font-extrabold text-3xl">79M+</div>
                  <div className="font-medium">Learners</div>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-3xl">85K</div>
                  <div className="font-medium">Instructors</div>
                </div>
              </div>
              <div className="text-center mt-5">
                <div className="font-extrabold text-3xl">75</div>
                <div className="font-medium">Language</div>
              </div>
            </div>
            <div>
              <div className="flex justify-around">
                <div className="text-center">
                  <div className="font-extrabold text-3xl">250K</div>
                  <div className="font-medium">Courses</div>
                </div>
                <div className="text-center">
                  <div className="font-extrabold text-3xl">1.1B+</div>
                  <div className="font-medium">Course enrollments</div>
                </div>
              </div>
              <div className="text-center mt-5">
                <div className="font-extrabold text-3xl">17K+</div>
                <div className="font-medium">Enterprise customers</div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
