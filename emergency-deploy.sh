#!/bin/bash

# 🚨 EMERGENCY DEPLOYMENT SCRIPT
# This script forces a new deployment by creating a significant change

echo "🚨 EMERGENCY DEPLOYMENT - FORCING NEW BUILD"
echo "=========================================="

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

print_status "Creating emergency deployment trigger..."

# Create a significant change to force deployment
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Add a new file to trigger deployment
cat > src/app/emergency-deploy.txt << EOF
Emergency deployment trigger - $TIMESTAMP
This file forces Vercel to detect changes and deploy
White background fix deployment
EOF

# Also update the layout with a more significant change
echo "/* EMERGENCY DEPLOYMENT TRIGGER - $TIMESTAMP */" >> src/app/layout.tsx
echo "/* FORCE WHITE BACKGROUND - URGENT */" >> src/app/layout.tsx

# Update package.json to trigger build
sed -i.bak 's/"version": "0.1.0"/"version": "0.1.1"/' package.json

print_status "Committing emergency changes..."
git add .
git commit -m "🚨 EMERGENCY DEPLOY: Force white background - $TIMESTAMP"

print_status "Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    print_success "✅ EMERGENCY DEPLOYMENT TRIGGERED!"
    print_success "🚀 Vercel should now detect the changes and deploy"
    echo ""
    print_status "📱 Check your Vercel dashboard in 2-3 minutes:"
    print_status "   https://vercel.com/miguel-elias-projects/geoleadsenricher"
    print_status "   Your site: https://geoleadsenricher.vercel.app"
    echo ""
    print_success "🎉 White background fix should be deploying now!"
else
    print_error "❌ Failed to push changes"
    exit 1
fi
