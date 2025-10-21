"use server";

import { z } from "zod";
import { subscribeToList } from "@/lib/mailchimp";
import { newsletterSchema, type NewsletterData } from "./newsletter-schema";

export async function subscribeToNewsletter(data: NewsletterData) {
  try {
    // Validate the data
    const validatedData = newsletterSchema.parse(data);

    // Check if the newsletter audience ID is configured
    const listId = process.env.MAILCHIMP_NEWSLETTER_AUDIENCE_ID;
    if (!listId) {
      console.error("MAILCHIMP_NEWSLETTER_AUDIENCE_ID is not configured in environment variables");
      return {
        success: false,
        message: "Newsletter subscription is not configured. Please contact support.",
      };
    }

    // Log subscription attempt (helpful for debugging)
    console.log(`Attempting to subscribe: ${validatedData.email} to list: ${listId}`);

    // Use custom tags if provided, otherwise default to website-newsletter
    const tags = validatedData.tags && validatedData.tags.length > 0 
      ? validatedData.tags 
      : ["website-newsletter"];

    console.log(`Tags to be applied: ${tags.join(", ")}`);

    // Subscribe to Mailchimp
    const result = await subscribeToList({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      listId,
      tags,
    });

    if (result.success) {
      console.log(`Successfully subscribed: ${validatedData.email}`);
    } else {
      console.error(`Failed to subscribe: ${validatedData.email}`, result);
    }

    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Validation error:", error.errors);
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

