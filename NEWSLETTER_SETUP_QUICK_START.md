# Newsletter Setup - Quick Start Guide

## Current Status
⚠️ **Newsletter signup configuration needs verification**

Your environment variables need to be checked. Follow the steps below to verify and enable newsletter functionality.

## Quick Setup (5 minutes)

### 1. Get Your Mailchimp Credentials

#### Get API Key:
1. Log into Mailchimp: https://mailchimp.com
2. Go to **Account** → **Extras** → **API keys**
   - Or visit: https://admin.mailchimp.com/account/api/
3. Click **Create A Key**
4. Copy the entire key (format: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-us1`)
5. Note the part after the dash (e.g., `us1`, `us2`, `us3`) - this is your server prefix

#### Get Audience ID:
1. In Mailchimp, go to **Audience** → **All contacts**
   - Or visit: https://admin.mailchimp.com/lists/
2. Click on your audience/list
3. Go to **Settings** → **Audience name and defaults**
4. Scroll down and copy the **Audience ID** (format: `abc123def4`)

### 2. Add to Your Environment File

Add the following variables to your existing `.env` or `.env.local` file (in the root directory, same level as `package.json`):

```env
# Mailchimp Configuration
MAILCHIMP_API_KEY=paste_your_api_key_here
MAILCHIMP_SERVER_PREFIX=us1

# Mailchimp Audience IDs  
MAILCHIMP_NEWSLETTER_AUDIENCE_ID=paste_your_audience_id_here
```

**Replace:**
- `paste_your_api_key_here` with your actual API key from step 1
- `us1` with your actual server prefix (from your API key)
- `paste_your_audience_id_here` with your actual Audience ID from step 1

**Note:** If you already have a `MAILCHIMP_API_KEY` in your `.env` file, just add the missing variables (`MAILCHIMP_SERVER_PREFIX` and `MAILCHIMP_NEWSLETTER_AUDIENCE_ID`).

### 3. Verify Setup

```bash
npm run check-mailchimp
```

This command will check if everything is configured correctly.

### 4. Restart Server

If your dev server is running, restart it:

```bash
# Stop the server (Ctrl+C)
# Then start it again:
npm run dev
```

### 5. Test It!

1. Visit your website (usually http://localhost:3000)
2. Go to a page with newsletter signup (e.g., Memberships page)
3. Enter a test email address
4. Click "Sign Up"
5. You should see a **confirmation modal** appear
6. Check your Mailchimp dashboard - the email should appear within 1-2 minutes

## What Changed

Your newsletter signup now includes:

✅ **Confirmation Modal** - Users see a success message when they subscribe
✅ **Better Error Messages** - Clear feedback if something goes wrong
✅ **Detailed Logging** - Check your terminal for debugging information
✅ **Configuration Checker** - Easy way to verify your setup

## Troubleshooting

### No confirmation modal appears?
1. Open browser console (F12)
2. Look for error messages
3. Check your terminal for logs

### Email not appearing in Mailchimp?
1. Run `npm run check-mailchimp` to verify configuration
2. Check that you're using the correct Audience ID
3. Log into Mailchimp and search for the email directly
4. Check your terminal logs for error details

### Configuration errors?
The most common issues:
- `.env.local` file not in the root directory
- Wrong API key or Audience ID
- Server prefix doesn't match API key
- Forgot to restart the dev server after creating `.env.local`

## Need More Help?

See the full documentation: [MAILCHIMP_SETUP.md](./MAILCHIMP_SETUP.md)

This guide includes:
- Detailed setup instructions
- How to create audiences/lists
- How to add custom merge fields
- Advanced configuration options
- Comprehensive troubleshooting section

