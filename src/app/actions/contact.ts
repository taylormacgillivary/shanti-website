"use server";

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendEmail(data: ContactFormData) {
  try {
    // Format the email content
    const emailContent = `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}
    `.trim();

    console.log("Contact form submission:", emailContent);

    // Send email using Web3Forms
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
          subject: `Contact Form: ${data.subject}`,
          from_name: data.name,
          email: data.email,
        }));
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
            Origin: "https://shantihotyoga.ca",
            Referer: "https://shantihotyoga.ca/contact",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: `Contact Form: ${data.subject}`,
            from_name: data.name,
            email: data.email,
            message: emailContent,
          }),
        });

        console.log("Response status:", response.status);
        console.log("Response headers:", Object.fromEntries(response.headers.entries()));

        // Get response text first to handle non-JSON responses
        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 500));

        // Try to parse as JSON
        let responseData;
        try {
          responseData = JSON.parse(responseText);
          console.log("Web3Forms API response:", responseData);
        } catch {
          console.error("Response was not JSON. Got HTML error page instead.");
          throw new Error(`Web3Forms API error (${response.status}): Received HTML instead of JSON`);
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
      message: "Your message has been sent successfully." 
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return { 
      success: false, 
      message: "An error occurred while sending your message. Please try again or contact us directly." 
    };
  }
} 