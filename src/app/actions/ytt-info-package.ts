"use server";

import { z } from "zod";
import { tagSignup } from "@/lib/mailchimp";

const requestSchema = z.object({
  firstName: z.string().trim().min(1, "Enter your first name.").max(100, "Enter a first name under 101 characters."),
  email: z.string().trim().max(254).email("Enter a valid email address.").toLowerCase(),
});

export async function requestYttInfoPackage(form: FormData) {
  const retryMessage = "We couldn’t process your request. Please try again or email info@shantihotyoga.ca.";
  if (!(form instanceof FormData) || form.get("website")) {
    return { status: "error" as const, message: retryMessage };
  }

  const data = requestSchema.safeParse({ firstName: form.get("firstName"), email: form.get("email") });
  if (!data.success) {
    return {
      status: "error" as const,
      message: data.error.issues[0].message,
    };
  }

  const listId = process.env.MAILCHIMP_NEWSLETTER_AUDIENCE_ID;
  if (!listId) {
    console.error("Missing Mailchimp newsletter audience for YTT info package requests");
    return { status: "error" as const, message: retryMessage };
  }

  try {
    const status = await tagSignup({ ...data.data, listId, tag: "YTT 2027 Info Package Request" });
    return { status };
  } catch (error) {
    console.error("Mailchimp YTT package request failed", (error as { status?: number }).status ?? "unknown");
    return { status: "error" as const, message: retryMessage };
  }
}
