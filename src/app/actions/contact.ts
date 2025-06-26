"use server";

import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type FormData = z.infer<typeof formSchema>;

export async function sendEmail(data: FormData) {
    console.log("Sending email with data:", data);
    // Here you would typically use a service like Resend, SendGrid, or Nodemailer
    // For this example, we'll just simulate a successful submission.
    return { success: true, data };
} 