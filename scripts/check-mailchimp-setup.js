#!/usr/bin/env node

/**
 * Mailchimp Setup Verification Script
 * 
 * This script checks if your Mailchimp configuration is set up correctly.
 * Run it with: node scripts/check-mailchimp-setup.js
 */

const fs = require('fs');

// Check which env file exists and load it
const envLocalExists = fs.existsSync('.env.local');
const envExists = fs.existsSync('.env');

if (envLocalExists) {
  console.log('📁 Loading environment variables from .env.local\n');
  require('dotenv').config({ path: '.env.local' });
} else if (envExists) {
  console.log('📁 Loading environment variables from .env\n');
  require('dotenv').config({ path: '.env' });
} else {
  console.log('❌ No .env or .env.local file found!\n');
  console.log('Please create a .env or .env.local file in the project root with your Mailchimp credentials.\n');
  process.exit(1);
}

const requiredEnvVars = [
  'MAILCHIMP_API_KEY',
  'MAILCHIMP_SERVER_PREFIX',
];

const optionalEnvVars = [
  'MAILCHIMP_NEWSLETTER_AUDIENCE_ID',
  'MAILCHIMP_CONTACT_AUDIENCE_ID',
  'MAILCHIMP_ENERGY_EXCHANGE_AUDIENCE_ID',
];

console.log('🔍 Checking Mailchimp Configuration...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('📋 Required Environment Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value === 'your_api_key_here' || value === 'us1' && varName === 'MAILCHIMP_SERVER_PREFIX') {
    console.log(`  ❌ ${varName}: NOT SET`);
    hasErrors = true;
  } else {
    // Mask the API key for security
    const displayValue = varName === 'MAILCHIMP_API_KEY' 
      ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}`
      : value;
    console.log(`  ✅ ${varName}: ${displayValue}`);
  }
});

// Check optional variables
console.log('\n📋 Optional Environment Variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.startsWith('your_')) {
    console.log(`  ⚠️  ${varName}: NOT SET (optional)`);
    if (varName === 'MAILCHIMP_NEWSLETTER_AUDIENCE_ID') {
      console.log('     Note: Newsletter signup will not work without this!');
      hasWarnings = true;
    }
  } else {
    console.log(`  ✅ ${varName}: ${value}`);
  }
});

// Check API key format
console.log('\n🔐 API Key Format Check:');
const apiKey = process.env.MAILCHIMP_API_KEY;
if (apiKey && apiKey !== 'your_api_key_here') {
  const parts = apiKey.split('-');
  if (parts.length === 2) {
    console.log('  ✅ API key format looks correct');
    const extractedPrefix = parts[1];
    const configuredPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
    if (extractedPrefix === configuredPrefix) {
      console.log(`  ✅ Server prefix matches API key (${extractedPrefix})`);
    } else {
      console.log(`  ⚠️  Server prefix mismatch!`);
      console.log(`     API key suffix: ${extractedPrefix}`);
      console.log(`     Configured prefix: ${configuredPrefix}`);
      console.log('     These should match! Update MAILCHIMP_SERVER_PREFIX to match your API key.');
      hasWarnings = true;
    }
  } else {
    console.log('  ❌ API key format appears incorrect (should be: xxx-us1)');
    hasErrors = true;
  }
}

// Final summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.log('❌ Setup is INCOMPLETE - please fix the errors above');
  console.log('\nNext steps:');
  console.log('1. Create a .env.local file in the project root');
  console.log('2. Add the required environment variables');
  console.log('3. Get your API key from: https://admin.mailchimp.com/account/api/');
  console.log('4. Get your Audience IDs from: https://admin.mailchimp.com/lists/');
  console.log('\nSee MAILCHIMP_SETUP.md for detailed instructions.');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  Setup is PARTIAL - some optional features may not work');
  console.log('\nTo enable all features, set the optional environment variables.');
  process.exit(0);
} else {
  console.log('✅ Setup looks good! All required variables are configured.');
  console.log('\nTest the integration by:');
  console.log('1. Starting your dev server: npm run dev');
  console.log('2. Visit a page with newsletter signup');
  console.log('3. Try subscribing with a test email');
  console.log('4. Check your Mailchimp dashboard for the new subscriber');
  process.exit(0);
}

