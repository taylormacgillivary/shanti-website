# Web3Forms Email Debugging Guide

## Issue
All forms stopped sending emails in production, even though they work in development and previously worked in production.

## Changes Made
Added detailed logging to all form actions to capture Web3Forms API responses and errors.

## How to Debug

### Step 1: Check Vercel Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on your latest production deployment
3. Go to "Functions" or "Runtime Logs" tab
4. Submit a test form on your production site
5. Look for these specific log messages:

#### If Environment Variable is Missing:
```
⚠️ Email service not configured. Form data logged above.
```
**Solution:** Add `NEXT_PUBLIC_WEB3FORMS_KEY` to Vercel environment variables and redeploy.

#### If Web3Forms API is Being Called:
```
✓ Sending to Web3Forms API...
✓ Web3Forms API response: { ... }
```

#### If Email Sends Successfully:
```
✓ Email sent successfully via Web3Forms
```

#### If Web3Forms Returns an Error:
```
❌ Failed to send email via Web3Forms. Status: [status_code]
❌ Web3Forms error response: { error: "...", message: "..." }
```

### Step 2: Common Web3Forms API Errors

#### Error: "Invalid access key"
- **Cause:** The access key is incorrect or expired
- **Solution:** 
  1. Login to web3forms.com
  2. Verify your access key
  3. Update the key in Vercel environment variables
  4. Redeploy

#### Error: "Access key not found" or "Access key has expired"
- **Cause:** The access key may have been deleted or your account is inactive
- **Solution:**
  1. Login to web3forms.com
  2. Check if your account is active
  3. Generate a new access key if needed
  4. Update in Vercel and redeploy

#### Error: "Rate limit exceeded"
- **Cause:** Too many requests sent to Web3Forms API
- **Solution:**
  1. Check Web3Forms dashboard for rate limits
  2. Consider upgrading your plan if needed
  3. Wait for rate limit to reset

#### Error: "Invalid email address"
- **Cause:** The `to_email` or `email` field contains an invalid email
- **Solution:** Check that `taylor@shantihotyoga.ca` is correct

### Step 3: Verify Environment Variable

In Vercel:
1. Settings → Environment Variables
2. Look for: `NEXT_PUBLIC_WEB3FORMS_KEY`
3. Ensure:
   - ✅ Name is exactly `NEXT_PUBLIC_WEB3FORMS_KEY` (case-sensitive)
   - ✅ Value is your actual Web3Forms access key
   - ✅ "Production" environment is checked
   - ✅ No extra spaces before/after the key

### Step 4: Check Web3Forms Dashboard

1. Login to https://web3forms.com
2. Check:
   - Account status (active/inactive)
   - Access key validity
   - Email delivery logs
   - Rate limits
   - Account quota

### Step 5: Test in Development

Before redeploying, test locally:
```bash
# Make sure your .env.local has the key
NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here

# Run development server
npm run dev

# Test form submission
# Check browser console and terminal for logs
```

## What to Look For in Logs

### Success Pattern:
```
Contact form submission: [form data]
Sending to Web3Forms API...
Web3Forms API response: { success: true, message: "Email sent successfully" }
Email sent successfully via Web3Forms
```

### Failure Pattern:
```
Contact form submission: [form data]
Sending to Web3Forms API...
Web3Forms API response: { success: false, message: "Invalid access key" }
Failed to send email via Web3Forms. Status: 400
Web3Forms error response: { success: false, message: "Invalid access key" }
```

### Missing Key Pattern:
```
Contact form submission: [form data]
Email service not configured. Form data logged above.
```

## Files Updated with Enhanced Logging

All form action files now include detailed Web3Forms API response logging:

1. `src/app/actions/contact.ts` - Contact form
2. `src/app/actions/energy-exchange.ts` - Energy Exchange application
3. `src/app/actions/membership.ts` - Suspend & Cancel membership forms

## Next Steps After Deploying

1. **Deploy these changes** to Vercel
2. **Submit a test form** on production
3. **Check Vercel logs immediately** after submission
4. **Share the Web3Forms API response** from the logs to diagnose the exact issue

## Possible Root Causes

Based on "forms worked, then stopped working":

1. **Web3Forms account issue:**
   - Free tier expired
   - Account suspended
   - Access key revoked
   - Rate limit hit

2. **Environment variable issue:**
   - Variable was deleted or changed in Vercel
   - Variable not applied to new deployments
   - Typo in variable name

3. **Email deliverability:**
   - Web3Forms is working but emails going to spam
   - Check spam folder in taylor@shantihotyoga.ca
   - Check Web3Forms dashboard for delivery status

4. **API changes:**
   - Web3Forms API endpoint changed (unlikely)
   - API requires new fields (unlikely)

## Contact Web3Forms Support

If logs show API calls are succeeding but emails aren't arriving:
- Email: support@web3forms.com
- Provide: Your access key and timestamp of test submissions
- Check: Their status page for any ongoing issues

