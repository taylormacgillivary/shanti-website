import type { MailchimpResponse } from "./mailchimp";

export const NEWSLETTER_SIGNUP_URL =
  "https://shantihotyoga.us18.list-manage.com/subscribe?u=5dd0b3419640df3adf1adbc53&id=20f894ac06";

export type NewsletterConfirmationResult =
  | { success: true; status: "subscribed"; message: string }
  | { success: false; status: "pending" | "resubscribe"; message: string; signupUrl: string };

export type NewsletterSubscriptionResult =
  | NewsletterConfirmationResult
  | { success: false; status: "error"; message: string };

export function newsletterSubscriptionResult(result: MailchimpResponse): NewsletterSubscriptionResult {
  // A successful API update does not mean an existing contact is subscribed.
  // Self-unsubscribed and permanently deleted contacts must opt in themselves.
  if (result.status === "unsubscribed" ||
      (!result.success && /compliance state|resubscribe|permanently deleted/i.test(result.error ?? ""))) {
    return {
      success: false,
      status: "resubscribe",
      message: "Please use our signup form to confirm that you would like to receive our emails again.",
      signupUrl: NEWSLETTER_SIGNUP_URL,
    };
  }

  if (!result.success) {
    return { success: false, status: "error", message: result.message };
  }

  if (result.status === "subscribed") {
    return { success: true, status: "subscribed", message: "You are subscribed to our newsletter." };
  }

  if (result.status === "pending") {
    return {
      success: false,
      status: "pending",
      message: "Your signup is awaiting confirmation. Check your inbox and spam folder for the confirmation email.",
      signupUrl: NEWSLETTER_SIGNUP_URL,
    };
  }

  return {
    success: false,
    status: "error",
    message: result.status === "cleaned"
      ? "We could not subscribe this address because previous emails could not be delivered. Please try another email address or contact info@shantihotyoga.ca."
      : "We could not confirm your subscription. Please contact info@shantihotyoga.ca for help.",
  };
}
