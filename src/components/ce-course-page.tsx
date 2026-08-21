import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { type CeCourse } from "@/data/ce-courses";

function DetailRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-sage-green rounded-full mt-2 flex-shrink-0" />
      <div>
        <p className="font-medium text-foreground">{label}</p>
        {children}
      </div>
    </div>
  );
}

function hasDefinitiveDate(date: string) {
  const normalized = date.trim().toLowerCase();
  return normalized.length > 0 && !normalized.includes("tbd");
}

function RegistrationButton({ course }: { course: CeCourse }) {
  if (
    hasDefinitiveDate(course.details.date) &&
    course.registration.status === "open"
  ) {
    return (
      <a
        href={course.registration.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center rounded-md bg-sage-green text-white font-medium px-4 py-3 hover:bg-sage-green/90 transition-colors"
      >
        Register
      </a>
    );
  }

  const label =
    course.registration.status === "closed"
      ? "Registration Closed"
      : "Registration Not Open";

  return (
    <button
      disabled
      className="w-full inline-flex items-center justify-center rounded-md bg-gray-400 text-white font-medium px-4 py-3 cursor-not-allowed transition-colors"
    >
      {label}
    </button>
  );
}

function InstructorCard({
  instructor,
  compact,
}: {
  instructor: CeCourse["instructors"][number];
  compact?: boolean;
}) {
  const size = instructor.imageSize ?? 200;
  const firstName = instructor.name.split(" ")[0];

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="flex-shrink-0 mx-auto md:mx-0">
        <Image
          src={instructor.image}
          alt={instructor.name}
          width={size}
          height={size}
          className={`rounded-lg object-cover ${instructor.imageObjectPosition ?? ""}`}
          style={{ height: `${size}px`, width: `${size}px` }}
        />
      </div>

      <div className="flex-1 text-center md:text-left">
        <h4
          className={`${compact ? "text-lg" : "text-xl"} font-semibold mb-2 text-sage-green`}
        >
          {instructor.name}
        </h4>
        {instructor.role ? (
          <p className="text-sm text-muted-foreground mb-3">{instructor.role}</p>
        ) : null}
        {instructor.bio.map((paragraph) => (
          <p
            key={paragraph.slice(0, 40)}
            className={`text-foreground/90 leading-relaxed mb-4 ${compact ? "text-sm" : ""}`}
          >
            {paragraph}
          </p>
        ))}
        {instructor.teachersLink ? (
          <Link
            href={instructor.teachersLink}
            className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
          >
            Read {firstName}&apos;s full bio →
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function CeCoursePage({ course }: { course: CeCourse }) {
  const compactInstructors = course.instructors.length > 1;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-24 bg-gradient-to-br from-background via-background to-muted overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-sage-green/10 text-sage-green border-sage-green/20"
            >
              Continuing Education
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-sage-text">{course.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground">{course.description}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/50 rounded-lg p-6 border border-sage-green/20">
                <p
                  className="text-lg leading-relaxed text-foreground/90 mb-6"
                  dangerouslySetInnerHTML={{ __html: course.intro }}
                />

                <div className="space-y-4">
                  {course.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="font-semibold text-lg mb-2 text-sage-green">
                        {section.title}
                      </h4>
                      <p className="text-foreground/90 leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-sage-green/10 rounded-lg p-6 border border-sage-green/30 sticky top-24">
                <h3 className="text-xl font-semibold mb-6 text-center">Course Details</h3>

                <div className="space-y-4">
                  <DetailRow label="Date">
                    <p className="text-muted-foreground">{course.details.date}</p>
                  </DetailRow>

                  {course.details.time ? (
                    <DetailRow label="Time">
                      <p className="text-muted-foreground">{course.details.time}</p>
                    </DetailRow>
                  ) : null}

                  {course.details.location ? (
                    <DetailRow label="Location">
                      <p className="text-muted-foreground">{course.details.location}</p>
                    </DetailRow>
                  ) : null}

                  <DetailRow label="Cost">
                    <p className="text-muted-foreground">{course.details.cost}</p>
                  </DetailRow>

                  <DetailRow label="CE Credits">
                    <p className="text-muted-foreground">{course.details.ceCredits}</p>
                  </DetailRow>
                </div>

                <div className="mt-6 pt-4 border-t border-sage-green/20">
                  <RegistrationButton course={course} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sage-green/5 to-sage-green/10 rounded-lg p-8 border border-sage-green/20">
            <h3 className="text-2xl font-semibold mb-6 text-center">
              {course.instructorsHeading ??
                (course.instructors.length > 1
                  ? "Meet Your Instructors"
                  : "Meet Your Instructor")}
            </h3>

            <div className={compactInstructors ? "space-y-8" : undefined}>
              {course.instructors.map((instructor) => (
                <InstructorCard
                  key={instructor.name}
                  instructor={instructor}
                  compact={compactInstructors}
                />
              ))}
            </div>

            {course.instructorsLink ? (
              <div className="mt-6 pt-4 border-t border-sage-green/20 text-center">
                <Link
                  href={course.instructorsLink.href}
                  className="inline-flex items-center text-sage-green hover:text-sage-green/80 font-medium transition-colors"
                >
                  {course.instructorsLink.label}
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
