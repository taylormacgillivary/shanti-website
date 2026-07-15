"use server";

export type YinTrainingFormData = {
  name: string;
  email: string;
  contactNumber: string;
  emergencyName: string;
  emergencyContact: string;
  emergencyRelationship: string;
  whyYinTraining: string;
  yinExperience: string;
  describeYinYoga: string;
  currentPractice: string;
};

export async function submitYinTrainingApplication(data: YinTrainingFormData) {
  try {
    const emailContent = `
New Yin Yoga Teacher Training Application

=== PERSONAL INFORMATION ===
Name: ${data.name}
Email: ${data.email}
Contact Number: ${data.contactNumber}

=== EMERGENCY CONTACT ===
Name: ${data.emergencyName}
Contact: ${data.emergencyContact}
Relationship: ${data.emergencyRelationship}

=== APPLICATION QUESTIONS ===

Why are you wanting to take the yin training?
${data.whyYinTraining}

What is your experience with yin? (personal practice)
${data.yinExperience}

In your own words, describe what yin yoga is.
${data.describeYinYoga}

Are you currently teaching yoga / a body worker / have an established yoga practice?
${data.currentPractice}
    `.trim();

    console.log("Yin training application submission:", emailContent);

    try {
      if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) {
        console.warn("Email service not configured. Form data logged above.");
      } else {
        console.log("Sending to Web3Forms API...");

        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
            Origin: "https://shantihotyoga.ca",
            Referer: "https://shantihotyoga.ca/teacher-training/yin-teacher-training",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: "New Yin Yoga Teacher Training Application",
            from_name: data.name,
            email: data.email,
            to: "stephanie@shantihotyoga.ca",
            message: emailContent,
          }),
        });

        const responseText = await response.text();
        console.log("Raw response:", responseText.substring(0, 500));

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
      throw emailError;
    }

    return {
      success: true,
      message: "Your yin training application has been submitted successfully.",
    };
  } catch (error) {
    console.error("Error submitting yin training application:", error);
    return {
      success: false,
      message:
        "An error occurred while submitting your application. Please try again or contact us directly.",
    };
  }
}
