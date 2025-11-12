# Forms Setup - Web3Forms Integration

## Overview
Multiple forms across the site have been updated to use Web3Forms API to send submissions to taylor@shantihotyoga.ca, all featuring consistent success message modals.

## Forms Updated

### 1. Energy Exchange Form
**Files Updated:**
- `src/app/actions/energy-exchange.ts` - Server action for form submission
- `src/components/energy-exchange-form.tsx` - Form component with success modal

**Features:**
- Handles energy exchange applications via Web3Forms API
- Collects: Name, Email, Phone, Newsletter signup, Location preferences, Availability, Shift preferences, Questionnaire responses
- Success message: "Application Submitted Successfully!"
- Form resets after successful submission
- Loading state during submission

### 2. Contact Form
**Files Updated:**
- `src/app/actions/contact.ts` - Server action for form submission
- `src/components/contact-form.tsx` - Form component with success modal

**Features:**
- Handles general contact form submissions via Web3Forms API
- Collects: Name, Email, Subject, Message
- Success message: "Message Sent Successfully!"
- Form resets after successful submission
- Loading state during submission
- Uses react-hook-form with Zod validation

### 3. Membership Forms (Already Existing)
**Files:**
- `src/app/actions/membership.ts` - Server actions for suspend/cancel forms
- `src/app/memberships/suspend-or-cancel/page.tsx` - Both forms with success modals

**Features:**
- Handles membership suspension and cancellation requests
- Already using Web3Forms API
- Success messages for both suspend and cancel actions

## Configuration Required

All forms use the `NEXT_PUBLIC_WEB3FORMS_KEY` environment variable, which should already be configured in your `.env.local` file if the membership forms are working.

If not configured, add to `.env.local`:
```
NEXT_PUBLIC_WEB3FORMS_KEY=your_web3forms_access_key_here
```

### Vercel Deployment
After adding the environment variable in Vercel:
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add `NEXT_PUBLIC_WEB3FORMS_KEY` with your Web3Forms access key
3. Ensure "Production" environment is checked
4. **Important:** Redeploy your application for the changes to take effect
5. The environment variable must be set BEFORE deployment to be available at runtime

## Consistent User Experience

All forms now follow the same pattern:

1. User fills out the form
2. Clicks submit button (shows "Submitting..." or "Sending..." during submission)
3. On success: Modal appears with:
   - Green checkmark icon (CheckCircle2 from lucide-react)
   - Success title
   - Description of what happens next
   - "If you have any questions..." message
   - "Close" button with gradient-sage styling
4. Form resets and is ready for next submission

## Success Messages

### Energy Exchange Form
- **Title:** "Application Submitted Successfully!"
- **Description:** "Thank you for your interest in our Energy Exchange program. We'll review your application and get back to you soon."

### Contact Form
- **Title:** "Message Sent Successfully!"
- **Description:** "Thank you for reaching out. We've received your message and will get back to you soon."

### Membership Forms
- **Suspend Title:** "Request Submitted Successfully!"
- **Cancel Title:** "Request Submitted Successfully!"
- **Description:** Tailored to each type (suspension/cancellation)

## Email Format

All emails sent to taylor@shantihotyoga.ca include:
- Clear subject lines identifying the form type
- All form fields formatted in a readable structure
- Proper labels and sections
- Sender's name and email

## Testing

### Energy Exchange Form
1. Navigate to `/energy-exchange`
2. Click "Apply Now"
3. Fill out all required fields
4. Submit and verify success modal

### Contact Form
1. Navigate to `/contact`
2. Fill out Name, Email, Subject, Message
3. Submit and verify success modal

### Membership Forms
1. Navigate to `/memberships/suspend-or-cancel`
2. Test both suspend and cancel flows
3. Verify success modals for each

## Technical Notes
- Forms will return success even if the Web3Forms key is missing (for development)
- All submissions are logged to console for debugging
- Error handling includes user-friendly messages
- Validation:
  - Energy Exchange: HTML5 required fields
  - Contact Form: Zod schema validation via react-hook-form (client-side schema)
  - Membership Forms: HTML5 required fields + custom validation
- All forms use consistent styling with gradient-sage buttons
- Success modals use identical structure and styling across all forms
- **Important:** Contact form uses client-side Zod schema to avoid server/client boundary issues with `zodResolver`

