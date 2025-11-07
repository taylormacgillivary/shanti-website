# Membership Forms Email Setup

The suspend and cancel membership forms are now functional and will send email notifications to `taylor@shantihotyoga.ca` when submitted.

## Email Service Configuration

The forms use Web3Forms (a free email service) to send notifications. To enable email sending:

### Option 1: Web3Forms (Recommended - Free)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Click "Create your Access Key"
3. Enter `taylor@shantihotyoga.ca` as the email address
4. Click "Get Started" or "Create Access Key"
5. Check the email inbox for `taylor@shantihotyoga.ca` - you'll receive an email with your access key
6. Copy the access key from the email
7. Create a `.env.local` file in the root of your project (if it doesn't exist) and add:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key-here
   ```
8. Restart your development server

**Note**: The access key is tied to the email address you provide, so all form submissions will be sent to that email.

### Option 2: Alternative Email Services

If you prefer to use a different email service, you can modify `/src/app/actions/membership.ts` to use:

- **Resend** (recommended for production)
- **SendGrid**
- **Nodemailer** with SMTP
- **Postmark**

## Current Functionality

Even without email configuration:
- Forms will still work and show success messages to users
- Form submissions are logged to the server console
- You can retrieve submissions from your hosting platform's logs (Vercel, etc.)

## Form Details

### Suspend Form
- **Subject Line**: "New Suspension Request"
- **Recipient**: taylor@shantihotyoga.ca
- **Fields**: Name, Email, Reason, Start Date, Number of Days, Additional Info

### Cancel Form
- **Subject Line**: "New Cancellation Request"
- **Recipient**: taylor@shantihotyoga.ca
- **Fields**: Name, Email, Cancellation Reasons, Other Reason, Feedback

## Quick Setup Steps (Summary)

```bash
# 1. Get your Web3Forms access key from https://web3forms.com
# 2. Create .env.local file in project root:
echo "NEXT_PUBLIC_WEB3FORMS_KEY=your-key-here" > .env.local

# 3. Restart your dev server
npm run dev
```

## Testing

To test the forms:
1. Navigate to `/memberships/suspend-or-cancel`
2. Click "Suspend or Cancel Your Membership"
3. Select either option and fill out the form
4. Submit and verify:
   - Success message appears in modal
   - Email arrives at taylor@shantihotyoga.ca (if configured)
   - Form data appears in server logs (check your terminal/console)

## Email Format

Emails will look like this:

**Suspend Request:**
```
Subject: New Suspension Request
From: [Member Name]

Name: John Doe
Email: john@example.com
Reason: Taking a break for medical reasons
Start Date: 2025-12-01
Number of Days: 45
Acknowledged Fee: Yes
```

**Cancel Request:**
```
Subject: New Cancellation Request
From: [Member Name]

Name: Jane Smith
Email: jane@example.com
Acknowledged 14-day notice: Yes

Reasons for Cancellation: I am leaving Halifax, I don't have time
Other Reason: Moving to Toronto for work
Feedback: Great classes, loved the instructors!
```

