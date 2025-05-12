import { Separator } from "@/components/ui/separator";

export default function StudentAboutUsPage() {
  return (
    <div className="px-28 py-20 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">About Us</h1>
      <Separator className="mb-6" />

      <section className="space-y-4 text-base leading-relaxed">
        <p>
          <strong>Welcome to Learn Web</strong> — your trusted platform to
          master the world of modern web development.
        </p>

        <p>
          At Learn Web, we believe <em>learning by doing</em> is the most
          effective way to grow. That’s why we focus on practical, hands-on
          learning through real-world projects. Whether you're a beginner
          starting with HTML and CSS or an advanced developer looking to upgrade
          with React, Laravel, or Node.js — we’ve got you covered.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">🚀 Our Mission</h2>
        <p>
          To empower learners by providing high-quality, accessible, and
          project-based web development education that builds real-world skills
          and job readiness.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          🎯 What We Offer
        </h2>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Structured courses with real projects</li>
          <li>Expert guidance and beginner-friendly lessons</li>
          <li>Regular updates to match industry trends</li>
          <li>Certificate of completion</li>
          <li>Community support and mentorship</li>
        </ul>
      </section>

      <Separator className="my-8" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          💼 Who Can Join?
        </h2>
        <p>
          Students, job-seekers, professionals, entrepreneurs — anyone
          passionate about learning web development can benefit from our
          platform.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">🤝 Our Vision</h2>
        <p>
          To become the leading platform for web development education in India
          and beyond, helping thousands of learners become confident developers
          and creators.
        </p>
      </section>

      <Separator className="my-8" />

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-900">
          📩 Get In Touch
        </h2>
        <p>
          Have questions or suggestions? Reach out to us at{" "}
          <a
            href="mailto:support@learnweb.com"
            className="text-blue-600 underline"
          >
            support@learnweb.com
          </a>{" "}
          — we’re always happy to help!
        </p>
      </section>
    </div>
  );
}
