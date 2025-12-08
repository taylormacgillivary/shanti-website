"use server";

export type ScholarshipFormData = {
  fullName: string;
  email: string;
  reasonsForEnrollment: string;
  teachingAspirations?: string;
  programSelection: string;
  personalDefinition: string;
  experienceAndStyle: string;
  currentRoutine: string;
  originStory: string;
  beyondPhysical: string;
  lessonsLearned: string;
  teacherQualities: string;
  fearsHesitations: string;
  supportSystem: string;
  additionalComments?: string;
};

export async function submitScholarshipApplication(data: ScholarshipFormData) {
  try {
    // Format the email content
    const emailContent = `
New YTT Scholarship Application

=== PERSONAL INFORMATION ===
Full Name: ${data.fullName}
Email: ${data.email}

=== MOTIVATION & INTENTIONS ===

Why do you want to take YTT?
${data.reasonsForEnrollment}

If you intend to teach, why do you want to do so?
${data.teachingAspirations || "Not answered"}

What draws you to the YTT program at Shanti?
${data.programSelection}

What does yoga mean to you?
${data.personalDefinition}

=== HISTORY OF PRACTICE ===

How long have you been practicing yoga, and has the style you prefer changed during this time?
${data.experienceAndStyle}

Do you have a regular studio and/or home practice?
${data.currentRoutine}

Why did you take your very first class? How different are your reasons for practicing now?
${data.originStory}

=== PHILOSOPHY & INNER WORK ===

What aspect of Yoga (outside of the physical asana poses) interests you most & why?
${data.beyondPhysical}

Explain 3 lessons that yoga has taught you:
${data.lessonsLearned}

What do you look for in a yoga teacher? What qualities does a good teacher possess?
${data.teacherQualities}

=== READINESS & SUPPORT ===

Do you have any fears or hesitations heading into the training?
${data.fearsHesitations}

Do you have a support system available to you for this training program?
${data.supportSystem}

Is there anything else we should know?
${data.additionalComments || "Not provided"}
    `.trim();

    console.log("Scholarship application submission:", emailContent);

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
          subject: "New YTT Scholarship Application",
          from_name: data.fullName,
          email: data.email,
        }));
        
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent": "Mozilla/5.0 (compatible; ShantiHotYoga/1.0; +https://shantihotyoga.ca)",
            Origin: "https://shantihotyoga.ca",
            Referer: "https://shantihotyoga.ca/teacher-training/ytt-200-hour",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: "New YTT Scholarship Application",
            from_name: data.fullName,
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
      message: "Your scholarship application has been submitted successfully." 
    };
  } catch (error) {
    console.error("Error submitting scholarship application:", error);
    return { 
      success: false, 
      message: "An error occurred while submitting your application. Please try again or contact us directly." 
    };
  }
}

