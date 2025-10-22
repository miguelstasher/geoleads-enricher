#!/bin/bash

# Create .env.local file with all API keys
cat > .env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zrgmktqkvnywsatxyfdt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZ21rdHFrdm55d3NhdHh5ZmR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzcwNjYsImV4cCI6MjA2NTY1MzA2Nn0.4fcMzip7BrHqWSjp9r52kHIyKmlCPEID4Qwe0rtMamo

# Google Maps API
GOOGLE_MAPS_API_KEY=AIzaSyCWLWBJJeNyMsV1ieKMQl53OJuzZLOYP-k

# Email Enrichment APIs
HUNTER_API_KEY=d5872c0d46ca867af0f53d823247c3be37b5446a
SNOV_API_USER_ID=9d6ecb9c93134a23a9fd4a052072783c
SNOV_API_SECRET=45aeaed702300aca97ff732a14e53132

# AWS Lambda URLs
AWS_LAMBDA_EMAIL_SCRAPER_URL=https://7sd6o8pk79.execute-api.eu-north-1.amazonaws.com/Working/EmailBusinessScraper
AWS_LAMBDA_AUTH_TOKEN=b24be261-f07b-4adf-a33c-cf87084b889b
AWS_LAMBDA_CAMPAIGN_URL=https://j28mhgjbo3.execute-api.eu-north-1.amazonaws.com/prod

# Social Media Search API
SERP_API_KEY=3e12634045d6b5edd5cf314df831aaadebd1d7c5c4c5e4114ef3b4be35a75de8

# Campaign Integration
INSTANTLY_API_KEY=Tb5OWIKAEMen7IrvsJxOBPnEgWnLG
INSTANTLY_API_URL=https://api.instantly.ai/
EOF

echo "✅ Environment variables configured!"
echo "📋 Created .env.local with all API keys"
echo ""
echo "🚀 All systems should now work:"
echo "  ✅ Google Maps extraction"
echo "  ✅ Email enrichment (Hunter.io + Snov.io + AWS Lambda)"
echo "  ✅ LinkedIn/Facebook URL search"
echo "  ✅ Campaign upload to Instantly.ai"
echo "  ✅ Complete workflow: extract → enrich → campaign → send"
echo ""
echo "🔄 Restart your development server to load the new environment variables:"
echo "   npm run dev"
