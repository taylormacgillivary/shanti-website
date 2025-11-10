# Energy Exchange Form Setup

## Overview
The Energy Exchange form has been updated to use Web3Forms API to send submissions to taylor@shantihotyoga.ca, matching the functionality of the suspend/cancel membership forms.

## Changes Made

### 1. Created Server Action
- **File**: `src/app/actions/energy-exchange.ts`
- Handles form submission via Web3Forms API
- Formats all form data into a readable email
- Sends to taylor@shantihotyoga.ca
- Uses the same Web3Forms access key as the membership forms

### 2. Updated Energy Exchange Form Component
- **File**: `src/components/energy-exchange-form.tsx`
- Added success message display (identical to suspend/cancel forms)
- Shows green checkmark icon on successful submission
- Includes "Application Submitted Successfully!" message
- Form resets after successful submission
- Added loading state during submission
- Removed the toast notification in favor of the modal success message

## Configuration Required

The form uses the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable, which should already be configured in your `.env.local` file if the membership forms are working.

If not configured, add to `.env.local`:
```
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

## Features

### Form Data Collected
- Name (First & Last)
- Email
- Phone
- Newsletter signup preference
- Location preferences (Halifax, Dartmouth, Bedford)
- Day availability (Monday-Sunday)
- Shift preferences (Morning, Evening, Anytime)
- Questionnaire responses:
  - How they heard about the program
  - Yoga experience
  - What appeals to them about the program
  - Potential conflicts
  - Additional information

### User Experience
1. User fills out the form
2. Clicks "Submit Application"
3. Button shows "Submitting..." during submission
4. On success: Shows green checkmark with success message
5. User clicks "Close" to dismiss the modal
6. Form is reset and ready for next submission

### Email Format
The email sent to taylor@shantihotyoga.ca includes all form fields in a structured, readable format with clear labels and sections.

## Testing

To test the form:
1. Navigate to `/energy-exchange`
2. Click "Apply Now"
3. Fill out all required fields
4. Submit the form
5. Verify the success message appears
6. Check taylor@shantihotyoga.ca for the email

## Notes
- The form will still return success even if the Web3Forms key is missing (for development)
- All submissions are logged to console for debugging
- Error handling includes user-friendly messages
- Form validation is handled by HTML5 required fields

