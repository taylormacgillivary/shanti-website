export type Web3FormsPayload = {
  access_key: string;
  subject: string;
  from_name: string;
  email: string;
  [key: string]: string | boolean | number | undefined;
};

export type Web3FormsResult = {
  success: boolean;
  message: string;
};

/**
 * Client-side Web3Forms submission (recommended by Web3Forms).
 * Access keys are public by design — do not call this from server actions.
 */
export async function submitWeb3Form(
  payload: Web3FormsPayload
): Promise<Web3FormsResult> {
  if (!payload.access_key) {
    return {
      success: false,
      message:
        "Email service is not configured. Please contact us directly or try again later.",
    };
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      botcheck: false,
    }),
  });

  const responseText = await response.text();
  let responseData: { success?: boolean; message?: string; body?: { message?: string } };

  try {
    responseData = JSON.parse(responseText);
  } catch {
    console.error("Web3Forms returned non-JSON:", responseText.substring(0, 200));
    return {
      success: false,
      message: "Something went wrong while sending your request. Please try again.",
    };
  }

  if (response.ok && responseData.success) {
    return {
      success: true,
      message:
        responseData.message ||
        responseData.body?.message ||
        "Form submitted successfully.",
    };
  }

  console.error("Web3Forms error:", response.status, responseData);
  return {
    success: false,
    message:
      responseData.message ||
      responseData.body?.message ||
      "Failed to send your request. Please try again or contact us directly.",
  };
}

/** Resolves a form-specific key, with temporary fallback to the legacy shared key. */
function resolveKey(specific?: string): string {
  return specific || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";
}

export const web3formsKeys = {
  contact: () => resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_CONTACT_KEY),
  energyExchange: () =>
    resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_ENERGY_EXCHANGE_KEY),
  scholarship: () =>
    resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_SCHOLARSHIP_KEY),
  yinTraining: () =>
    resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_YIN_TRAINING_KEY),
  suspend: () => resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_SUSPEND_KEY),
  cancel: () => resolveKey(process.env.NEXT_PUBLIC_WEB3FORMS_CANCEL_KEY),
};
