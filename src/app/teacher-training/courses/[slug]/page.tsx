import { notFound } from "next/navigation";
import { CeCoursePage } from "@/components/ce-course-page";
import { getCeCourseById, getCeCourseSlugs } from "@/data/ce-courses";

export function generateStaticParams() {
  return getCeCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCeCourseById(slug);
  if (!course) {
    return { title: "Course Not Found" };
  }

  return {
    title: `${course.name} | Shanti Hot Yoga`,
    description: course.description,
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCeCourseById(slug);
  if (!course) {
    notFound();
  }

  return <CeCoursePage course={course} />;
}
