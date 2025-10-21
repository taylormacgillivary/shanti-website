# Mailchimp Setup Instructions

This guide will help you configure Mailchimp integration for your Shanti Yoga website.

## Prerequisites

- A Mailchimp account (sign up at https://mailchimp.com if you don't have one)
- Access to your Mailchimp API settings

## Step 1: Get Your Mailchimp API Key

1. Log in to your Mailchimp account
2. Navigate to **Account** → **Extras** → **API keys**
   - Direct link: https://us1.admin.mailchimp.com/account/api/
3. Click **Create A Key** if you don't have one
4. Copy the API key (it looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1`)
5. Note the server prefix (the part after the dash, e.g., `us1`, `us2`, etc.)

## Step 2: Create Your Mailchimp Audiences (Lists)

You'll need to create separate audiences for different types of subscriptions:

### 2.1 Newsletter Audience

1. Go to **Audience** → **All contacts** → **Create Audience**
   - Direct link: https://admin.mailchimp.com/lists/
2. Name: "Newsletter Subscribers"
3. After creation, go to **Settings** → **Audience name and defaults**
4. Copy the **Audience ID** (looks like: `abc123def4`)

### 2.2 Contact Form Audience (Optional)

1. Create another audience named "Contact Form Submissions"
2. Copy the Audience ID
3. Add custom merge fields if desired:
   - Go to **Settings** → **Audience fields and *|MERGE|* tags**
   - Add fields like:
     - `SUBJECT` (Text field)
     - `MESSAGE` (Text field)

### 2.3 Energy Exchange Audience (Optional)

1. Create another audience named "Energy Exchange Applications"
2. Copy the Audience ID
3. Add custom merge fields:
   - `PHONE` (Phone Number field)
   - `LOCATION` (Text field)

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=your_actual_api_key_here
MAILCHIMP_SERVER_PREFIX=us1

# Mailchimp Audience IDs
MAILCHIMP_NEWSLETTER_AUDIENCE_ID=your_newsletter_audience_id
MAILCHIMP_CONTACT_AUDIENCE_ID=your_contact_audience_id
MAILCHIMP_ENERGY_EXCHANGE_AUDIENCE_ID=your_energy_exchange_audience_id
```

3. Replace the placeholder values with your actual values from Steps 1 and 2

**Important Notes:**
- The `.env.local` file must be in the root directory of the project
- The file should NOT be committed to git (it's in `.gitignore`)
- At minimum, you MUST set `MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, and `MAILCHIMP_NEWSLETTER_AUDIENCE_ID` for newsletter signup to work
- The server prefix in the API key (the part after the dash) must match `MAILCHIMP_SERVER_PREFIX`

## Step 4: Verify Configuration

Before starting your server, verify your configuration is correct:

```bash
npm run check-mailchimp
```

This will check that all required environment variables are set correctly.

## Step 5: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your website's membership page (or any page with newsletter signup)
3. Try subscribing with a test email address
4. You should see a confirmation modal if successful
5. Check your Mailchimp audience dashboard to confirm the subscriber was added
6. Check the terminal/console for detailed log messages about the subscription process

## Features Included

### Newsletter Subscription
The newsletter signup component can be added to any page and will automatically tag subscribers based on where they signed up.

**Current implementations:**
- **Membership page**: Tags: `memberships`, `website-newsletter`
- **Retreats page**: Tags: `retreats`, `website-newsletter`

All newsletter signups go to the **same master list** (MAILCHIMP_NEWSLETTER_AUDIENCE_ID), but are tagged differently so you can:
- Segment your audience by interest
- Send targeted campaigns (e.g., retreat announcements only to people tagged with "retreats")
- Track where your subscribers came from

### Contact Form Integration (Ready to use)
- Tags: `website-contact`
- Captures: Email, Name, Subject, Message

### Energy Exchange Form (Ready to use)
- Tags: `website-energy-exchange`
- Captures: Email, First Name, Last Name, Phone, Location

## Using Tags for Segmentation

### What are Tags?
Tags are labels you can apply to subscribers in Mailchimp. They allow you to organize your audience without creating multiple lists.

### Why Use One List with Tags?
- **Better for subscribers**: They only get one confirmation email, not multiple
- **Easier management**: All contacts in one place
- **Cost-effective**: Mailchimp charges per unique email, not per list
- **Flexible targeting**: You can send to people with specific tags

### Example Use Cases

**Retreat Announcements:**
1. Someone signs up on the retreats page → tagged with "retreats" + "website-newsletter"
2. When you have a new retreat, create a campaign in Mailchimp
3. Target only subscribers with the "retreats" tag
4. They receive retreat info because they expressed interest

**General Newsletter:**
1. Send to everyone with "website-newsletter" tag
2. Reaches people from all pages (retreats, memberships, etc.)

### Adding Newsletter Signup to Other Pages

You can easily add the newsletter component to any page:

```tsx
import { NewsletterSignup } from "@/components/newsletter-signup";

// In your page component:
<NewsletterSignup
  title="Stay Updated"
  subtitle="Get notified about special offers"
  tags={["special-offers", "website-newsletter"]}
  placeholder="Your email"
  buttonText="Subscribe"
/>
```

**Tag naming suggestions:**
- Use descriptive names: `retreats`, `workshops`, `teacher-training`
- Always include `website-newsletter` as a secondary tag
- Keep names lowercase with hyphens (e.g., `yoga-nidra`)
- Be consistent across your site

## Troubleshooting

### Quick Diagnostics

First, run the configuration checker:
```bash
npm run check-mailchimp
```

This will identify most configuration issues.

### Common Issues

#### "Newsletter subscription is not configured" error
**Cause:** `MAILCHIMP_NEWSLETTER_AUDIENCE_ID` is not set in `.env.local`

**Solution:**
1. Check that `.env.local` file exists in the project root
2. Verify `MAILCHIMP_NEWSLETTER_AUDIENCE_ID` is set
3. Get your Audience ID from Mailchimp (Settings → Audience name and defaults)
4. Restart your development server after making changes

#### "MAILCHIMP_API_KEY is not configured" error
**Cause:** API key is missing or `.env.local` file doesn't exist

**Solution:**
1. Create `.env.local` file in the project root
2. Add `MAILCHIMP_API_KEY=your_key_here`
3. Verify the variable name is exactly `MAILCHIMP_API_KEY`
4. Restart your development server

#### "List not found" error
**Cause:** Invalid Audience ID or API key doesn't have access

**Solution:**
1. Double-check your Audience ID in Mailchimp dashboard
2. Make sure you copied the ID correctly (no extra spaces)
3. Verify the audience hasn't been deleted
4. Check that your API key has permissions to access this list
5. Check the server console for detailed error messages

#### No confirmation modal appears
**Cause:** Subscription failed silently

**Solution:**
1. Open browser DevTools console (F12) to see error messages
2. Check the terminal where your dev server is running for detailed logs
3. You'll see messages like:
   - `Attempting to subscribe: email@example.com to list: abc123`
   - `Mailchimp: Member added/updated. Status: subscribed`
4. If you see errors, they will show the specific problem

#### Subscriber not appearing in Mailchimp
**Cause:** Various - check logs for details

**Solution:**
1. Check the browser console for error messages
2. Check the server terminal for detailed Mailchimp API responses
3. Look for these specific issues:
   - Email validation failures
   - Duplicate subscriber (they may already be in the list)
   - Wrong Audience ID
   - Mailchimp account issues
4. Verify the email address is valid
5. Check your Mailchimp dashboard for any bounce or rejection notices
6. Try logging into Mailchimp and searching for the email directly

#### API Key Issues
**Cause:** Invalid or incorrectly formatted API key

**Solution:**
1. Make sure the API key includes the server prefix (e.g., `xxxxxxxx-us1`)
2. Verify `MAILCHIMP_SERVER_PREFIX` matches the suffix of your API key
3. Check that the API key is active in your Mailchimp account
4. Ensure the API key has the necessary permissions (not read-only)
5. Try generating a new API key if the current one doesn't work

### Checking Logs

The application now includes detailed logging for troubleshooting:

**Server logs** (in your terminal):
- Shows when subscriptions are attempted
- Shows the list ID being used
- Shows tags being applied
- Shows Mailchimp API responses
- Shows detailed error messages with status codes

**Browser console** (F12 → Console tab):
- Shows client-side errors
- Shows toast notifications
- Shows network request failures

### Testing Checklist

1. ✅ `.env.local` file exists in project root
2. ✅ All required environment variables are set
3. ✅ `npm run check-mailchimp` passes
4. ✅ Dev server has been restarted since adding env vars
5. ✅ Browser console shows no errors
6. ✅ Server terminal shows subscription attempt logs
7. ✅ Confirmation modal appears after submission
8. ✅ Subscriber appears in Mailchimp dashboard within 1-2 minutes

## Security Notes

- **Never commit your `.env.local` file to version control**
- The `.env.local` file should be in your `.gitignore`
- Keep your API keys secure and don't share them publicly
- Use environment variables for all sensitive data

## Additional Resources

- [Mailchimp Marketing API Documentation](https://mailchimp.com/developer/marketing/api/)
- [Mailchimp Audience Management](https://mailchimp.com/help/getting-started-with-audiences/)
- [Mailchimp API Keys](https://mailchimp.com/help/about-api-keys/)

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Review the server logs for detailed error information
3. Verify all environment variables are set correctly
4. Ensure your Mailchimp account is active and in good standing

