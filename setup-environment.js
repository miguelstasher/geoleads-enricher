const fs = require('fs');
const path = require('path');

// All API keys from ACTUAL_API_KEYS_FOUND.md
const environmentVariables = {
  // Supabase (already configured)
  'NEXT_PUBLIC_SUPABASE_URL': 'https://zrgmktqkvnywsatxyfdt.supabase.co',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZ21rdHFrdm55d3NhdHh5ZmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNjYsImV4cCI6MjA2NTY1MzA2Nn0.4fcMzip7BrHqWSjp9r52kHIyKmlCPEID4Qwe0rtMamo',
  
  // Google Maps API (already working)
  'GOOGLE_MAPS_API_KEY': 'AIzaSyCWLWBJJeNyMsV1ieKMQl53OJuzZLOYP-k',
  
  // Email Enrichment APIs
  'HUNTER_API_KEY': 'd5872c0d46ca867af0f53d823247c3be37b5446a',
  'SNOV_API_USER_ID': '9d6ecb9c93134a23a9fd4a052072783c',
  'SNOV_API_SECRET': '45aeaed702300aca97ff732a14e53132',
  
  // AWS Lambda URLs
  'AWS_LAMBDA_EMAIL_SCRAPER_URL': 'https://7sd6o8pk79.execute-api.eu-north-1.amazonaws.com/Working/EmailBusinessScraper',
  'AWS_LAMBDA_AUTH_TOKEN': 'b24be261-f07b-4adf-a33c-cf87084b889b',
  'AWS_LAMBDA_CAMPAIGN_URL': 'https://j28mhgjbo3.execute-api.eu-north-1.amazonaws.com/prod',
  
  // Social Media Search API
  'SERP_API_KEY': '3e12634045d6b5edd5cf314df831aaadebd1d7c5c4c5e4114ef3b4be35a75de8',
  
  // Campaign Integration
  'INSTANTLY_API_KEY': 'Tb5OWIKAEMen7IrvsJxOBPnEgWnLG',
  'INSTANTLY_API_URL': 'https://api.instantly.ai/'
};

// Create .env.local file
const envContent = Object.entries(environmentVariables)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

fs.writeFileSync('.env.local', envContent);

console.log('✅ Environment variables configured!');
console.log('📋 Created .env.local with all API keys:');
console.log('');

Object.entries(environmentVariables).forEach(([key, value]) => {
  const maskedValue = value.length > 20 ? value.substring(0, 20) + '...' : value;
  console.log(`${key}=${maskedValue}`);
});

console.log('');
console.log('🚀 All systems should now work:');
console.log('  ✅ Google Maps extraction');
console.log('  ✅ Email enrichment (Hunter.io + Snov.io + AWS Lambda)');
console.log('  ✅ LinkedIn/Facebook URL search');
console.log('  ✅ Campaign upload to Instantly.ai');
console.log('  ✅ Complete workflow: extract → enrich → campaign → send');
