"use server";

import { z } from "zod";
import { subscribeToList } from "@/lib/mailchimp";

export const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

export async function subscribeToNewsletter(data: NewsletterData) {
  try {
    // Validate the data
    const validatedData = newsletterSchema.parse(data);

    // Check if the newsletter audience ID is configured
    const listId = process.env.MAILCHIMP_NEWSLETTER_AUDIENCE_ID;
    if (!listId) {
      return {
        success: false,
        message: "Newsletter subscription is not configured. Please contact support.",
      };
    }

    // Use custom tags if provided, otherwise default to website-newsletter
    const tags = validatedData.tags && validatedData.tags.length > 0 
      ? validatedData.tags 
      : ["website-newsletter"];

    // Subscribe to Mailchimp
    const result = await subscribeToList({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      listId,
      tags,
    });

    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.errors[0].message,
      };
    }

    console.error("Newsletter subscription error:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export async function subscribeToContactList(data: {
  email: string;
  name: string;
  subject?: string;
  message?: string;
}) {
  try {
    const listId = process.env.MAILCHIMP_CONTACT_AUDIENCE_ID;
    if (!listId) {
      // If no contact list is configured, just skip Mailchimp
      return { success: true, message: "Contact form submitted successfully." };
    }

    const [firstName, ...lastNameParts] = data.name.split(" ");
    const lastName = lastNameParts.join(" ");

    const mergeFields: Record<string, string> = {};
    if (data.subject) {
      mergeFields.SUBJECT = data.subject.substring(0, 100);
    }
    if (data.message) {
      mergeFields.MESSAGE = data.message.substring(0, 500);
    }

    const result = await subscribeToList({
      email: data.email,
      firstName,
      lastName,
      listId,
      tags: ["website-contact"],
      mergeFields,
    });

    return result;
  } catch (error) {
    console.error("Contact list subscription error:", error);
    return {
      success: true, // Don't fail the contact form if Mailchimp fails
      message: "Contact form submitted successfully.",
    };
  }
}

export async function subscribeToEnergyExchange(data: {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  location?: string;
}) {
  try {
    const listId = process.env.MAILCHIMP_ENERGY_EXCHANGE_AUDIENCE_ID;
    if (!listId) {
      return {
        success: true,
        message: "Energy exchange application submitted successfully.",
      };
    }

    const mergeFields: Record<string, string> = {};
    if (data.phone) {
      mergeFields.PHONE = data.phone;
    }
    if (data.location) {
      mergeFields.LOCATION = data.location;
    }

    const result = await subscribeToList({
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      listId,
      tags: ["website-energy-exchange"],
      mergeFields,
    });

    return result;
  } catch (error) {
    console.error("Energy exchange list subscription error:", error);
    return {
      success: true,
      message: "Energy exchange application submitted successfully.",
    };
  }
}

