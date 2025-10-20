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

## Step 4: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to your website's membership page
3. Try subscribing with a test email address
4. Check your Mailchimp audience to confirm the subscriber was added

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

### "MAILCHIMP_API_KEY is not configured" error
- Make sure your `.env.local` file exists in the project root
- Verify the variable name is exactly `MAILCHIMP_API_KEY`
- Restart your development server after adding environment variables

### "List not found" error
- Double-check your Audience ID in Mailchimp
- Make sure you copied the ID correctly (no extra spaces)
- Verify the audience hasn't been deleted

### Subscriber not appearing in Mailchimp
- Check the Mailchimp dashboard for any bounce or rejection notices
- Look at the browser console for error messages
- Verify the email address is valid

### API Key Issues
- Make sure the API key includes the server prefix (e.g., `-us1` at the end)
- Verify the API key is active in your Mailchimp account
- Check that the API key has the necessary permissions

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

