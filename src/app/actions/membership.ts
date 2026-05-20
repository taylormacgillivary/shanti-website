"use server";

export type SuspendFormData = {
  firstName: string;
  lastName: string;
  email: string;
  acknowledgeFee: boolean;
  reason: string;
  startDate: string;
  numberOfDays: string;
  additionalInfo?: string;
};

export type CancelFormData = {
  firstName: string;
  lastName: string;
  email: string;
  acknowledge: boolean;
  reasons: {
    leavingHalifax: boolean;
    notUsingEnough: boolean;
    tooExpensive: boolean;
    noTime: boolean;
    attendingAnother: boolean;
    illness: boolean;
  };
  otherReason?: string;
  feedback?: string;
};

export async function submitSuspendRequest(data: SuspendFormData) {
  try {
    // Manual validation for acknowledgement checkbox
    if (!data.acknowledgeFee) {
      return {
        success: false,
        message: "You must acknowledge the administration fee.",
      };
    }

    // Format the email content
    const emailContent = `
New Membership Suspension Request

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Reason: ${data.reason}
Start Date: ${data.startDate}
Number of Days: ${data.numberOfDays}
Acknowledged Fee: Yes
${data.additionalInfo ? `\nAdditional Information:\n${data.additionalInfo}` : ''}
    `.trim();

    console.log("Suspend request submission:", emailContent);

    // Send email using Web3Forms or similar service
    try {
      // If Web3Forms key is not available, just log it
      if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
        console.warn("Email service not configured. Form data logged above.");
        // Still return success so the user sees confirmation
        // The form data is logged and can be retrieved from server logs
      } else {
        console.log("Sending to Web3Forms API...");
        console.log("Request body:", JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.substring(0, 10) + "...",
          subject: "New Suspension Request",
          from_name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        }));
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
            Origin: "https://shantihotyoga.ca",
            Referer: "https://shantihotyoga.ca/memberships/suspend-or-cancel",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: "New Suspension Request",
            from_name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            message: emailContent,
          }),
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));

        // Get response text first to see what we're getting
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 500));

        // Try to parse as JSON
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Web3Forms API response:", responseData);
        } catch {
          console.error("Failed to parse response as JSON. Response was:", responseText.substring(0, 200));
          throw new Error("Web3Forms returned invalid response");
        }

        if (responseData.success) {
          console.log("Email sent successfully via Web3Forms");
        } else {
          console.error("Failed to send email via Web3Forms");
          console.error("Web3Forms error response:", responseData);
          throw new Error(responseData.message || "Failed to send email");
        }
      }
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      throw emailError; // Re-throw to trigger error response
    }

    return { 
      success: true, 
      message: "Your suspension request has been submitted successfully." 
    };
  } catch (error) {
    console.error("Error submitting suspension request:", error);
    return { 
      success: false, 
      message: "An error occurred while submitting your request. Please try again or contact us directly." 
    };
  }
}

export async function submitCancelRequest(data: CancelFormData) {
  try {
    // Manual validation for acknowledgement checkbox
    if (!data.acknowledge) {
      return {
        success: false,
        message: "You must acknowledge the 14-day notice requirement.",
      };
    }

    // Format the reasons
    const selectedReasons = Object.entries(data.reasons)
      .filter(([, value]) => value)
      .map(([key]) => {
        const reasonLabels: Record<string, string> = {
          leavingHalifax: "I am leaving Halifax",
          notUsingEnough: "I don't use my membership enough",
          tooExpensive: "The membership is too expensive",
          noTime: "I don't have time",
          attendingAnother: "I am attending another yoga studio/fitness facility",
          illness: "I have an illness/injury that prevents me from taking classes",
        };
        return reasonLabels[key];
      })
      .join(", ");

    // Format the email content
    const emailContent = `
New Membership Cancellation Request

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Acknowledged 14-day notice: Yes

Reasons for Cancellation: ${selectedReasons || "Not specified"}
${data.otherReason ? `\nOther Reason:\n${data.otherReason}` : ''}
${data.feedback ? `\nFeedback:\n${data.feedback}` : ''}
    `.trim();

    console.log("Cancel request submission:", emailContent);

    // Send email using Web3Forms or similar service
    try {
      // If Web3Forms key is not available, just log it
      if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
        console.warn("Email service not configured. Form data logged above.");
        // Still return success so the user sees confirmation
        // The form data is logged and can be retrieved from server logs
      } else {
        console.log("Sending to Web3Forms API...");
        console.log("Request body:", JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY?.substring(0, 10) + "...",
          subject: "New Cancellation Request",
          from_name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        }));
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
            Origin: "https://shantihotyoga.ca",
            Referer: "https://shantihotyoga.ca/memberships/suspend-or-cancel",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: "New Cancellation Request",
            from_name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            message: emailContent,
          }),
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));

        // Get response text first to see what we're getting
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 500));

        // Try to parse as JSON
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Web3Forms API response:", responseData);
        } catch {
          console.error("Failed to parse response as JSON. Response was:", responseText.substring(0, 200));
          throw new Error("Web3Forms returned invalid response");
        }

        if (responseData.success) {
          console.log("Email sent successfully via Web3Forms");
        } else {
          console.error("Failed to send email via Web3Forms");
          console.error("Web3Forms error response:", responseData);
          console.warn(
            "Cancellation request logged above but email notification was not sent. Check server logs and Web3Forms dashboard."
          );
        }
      }
    } catch (emailError) {
      console.error("Error sending cancellation email:", emailError);
      console.warn(
        "Cancellation request logged above but email notification failed. Check server logs."
      );
    }

    return { 
      success: true, 
      message: "Your cancellation request has been submitted successfully." 
    };
  } catch (error) {
    console.error("Error submitting cancellation request:", error);
    return { 
      success: false, 
      message: "An error occurred while submitting your request. Please try again or contact us directly." 
    };
  }
}

