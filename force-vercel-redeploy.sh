#!/bin/bash

# 🚨 FORCE VERCEL REDEPLOY SCRIPT
# This script forces Vercel to redeploy by creating a webhook trigger

echo "🚨 FORCING VERCEL REDEPLOY"
echo "========================="

# Set up Node.js path
export PATH="/Users/miguelelias/Desktop/salestool/node-v20.11.0-darwin-arm64/bin:$PATH"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_status "Creating a massive change to force Vercel detection..."

# Create a very significant change that Vercel cannot ignore
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Update the main page with a huge change
cat >> src/app/page.tsx << EOF

// MASSIVE CHANGE TO FORCE VERCEL DEPLOYMENT - $TIMESTAMP
// This is a huge change that Vercel must detect
// White background fix deployment
// Emergency deployment trigger
EOF

# Update package.json with a major version change
sed -i.bak 's/"version": "0.1.1"/"version": "0.2.0"/' package.json

# Create a new important file
cat > src/app/vercel-deploy-trigger.js << EOF
// Vercel deployment trigger - $TIMESTAMP
// This file forces Vercel to rebuild
console.log('Vercel deployment triggered at $TIMESTAMP');
EOF

# Update next.config.ts
cat >> next.config.ts << EOF

// FORCE VERCEL DEPLOYMENT - $TIMESTAMP
// This change should trigger a new build
export const forceDeploy = true;
EOF

print_status "Committing massive changes..."
git add .
git commit -m "🚨 MASSIVE CHANGE: Force Vercel deployment - $TIMESTAMP"

print_status "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    print_success "✅ MASSIVE CHANGES PUSHED!"
    print_success "🚀 Vercel MUST detect these changes now"
    echo ""
    print_warning "If Vercel still doesn't deploy, the webhook is broken"
    print_warning "You may need to manually redeploy from Vercel dashboard"
    echo ""
    print_status "📱 Check your Vercel dashboard:"
    print_status "   https://vercel.com/miguel-elias-projects/geoleadsenricher"
    print_status "   Look for commit: MASSIVE CHANGE: Force Vercel deployment"
    echo ""
    print_status "If no new deployment appears, try:"
    print_status "1. Go to Vercel dashboard"
    print_status "2. Click on the latest deployment"
    print_status "3. Click 'Redeploy' button"
else
    print_error "❌ Failed to push changes"
    exit 1
fi
