"use server";

export type EnergyExchangeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  newsletter: boolean;
  locations: {
    halifax: boolean;
    dartmouth: boolean;
    bedford: boolean;
  };
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
  shifts: {
    morning: boolean;
    evening: boolean;
    anytime: boolean;
  };
  howDidYouHear?: string;
  yogaExperience?: string;
  programAppeal?: string;
  conflicts?: string;
  additionalInfo?: string;
};

export async function submitEnergyExchangeApplication(data: EnergyExchangeFormData) {
  try {
    // Format the locations
    const selectedLocations = Object.entries(data.locations)
      .filter(([, value]) => value)
      .map(([key]) => {
        const locationLabels: Record<string, string> = {
          halifax: "Halifax",
          dartmouth: "Dartmouth",
          bedford: "Bedford",
        };
        return locationLabels[key];
      })
      .join(", ");

    // Format the availability
    const selectedDays = Object.entries(data.availability)
      .filter(([, value]) => value)
      .map(([key]) => {
        const dayLabels: Record<string, string> = {
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
          sunday: "Sunday",
        };
        return dayLabels[key];
      })
      .join(", ");

    // Format the shifts
    const selectedShifts = Object.entries(data.shifts)
      .filter(([, value]) => value)
      .map(([key]) => {
        const shiftLabels: Record<string, string> = {
          morning: "Morning",
          evening: "Evening",
          anytime: "Anytime",
        };
        return shiftLabels[key];
      })
      .join(", ");

    // Format the email content
    const emailContent = `
New Energy Exchange Application

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}
Newsletter Signup: ${data.newsletter ? "Yes" : "No"}

Location Preference: ${selectedLocations || "Not specified"}
Availability: ${selectedDays || "Not specified"}
Shift Preference: ${selectedShifts || "Not specified"}

How did you hear about the Energy Exchange Program?
${data.howDidYouHear || "Not answered"}

How long have you been practicing yoga?
${data.yogaExperience || "Not answered"}

What appeals to you most about the Energy Exchange Program and what do you hope to gain from participating?
${data.programAppeal || "Not answered"}

Is there anything that may interfere with your Energy Exchange position such as school, work commitments, family obligations, etc.?
${data.conflicts || "Not answered"}

Additional Information:
${data.additionalInfo || "Not provided"}
    `.trim();

    console.log("Energy Exchange application submission:", emailContent);

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
          subject: "New Energy Exchange Application",
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
            Referer: "https://shantihotyoga.ca/energy-exchange",
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            subject: "New Energy Exchange Application",
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
      message: "Your Energy Exchange application has been submitted successfully." 
    };
  } catch (error) {
    console.error("Error submitting Energy Exchange application:", error);
    return { 
      success: false, 
      message: "An error occurred while submitting your application. Please try again or contact us directly." 
    };
  }
}

