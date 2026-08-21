import { redirect } from "next/navigation";

/** Old combined Short CE Courses page — redirects to individual course pages. */
export default function ShortCECoursesRedirectPage() {
  redirect("/teacher-training/courses/chanting-mantras-sanskrit");
}
