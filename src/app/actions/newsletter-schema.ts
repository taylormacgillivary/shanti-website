import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

