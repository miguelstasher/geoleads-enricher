#!/bin/bash

# 🚀 IMMEDIATE VERCEL DEPLOYMENT SCRIPT
# This script uses Vercel CLI to deploy directly

echo "🚀 IMMEDIATE VERCEL DEPLOYMENT"
echo "=============================="

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

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in the project root directory"
    exit 1
fi

print_status "Starting immediate deployment..."

# Step 1: Commit any changes
print_status "Committing any changes..."
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - White background fix" || true

# Step 2: Deploy directly with Vercel CLI
print_status "Deploying directly with Vercel CLI..."
print_warning "You may need to login to Vercel if this is the first time"

# Deploy to production
vercel --prod --yes

if [ $? -eq 0 ]; then
    print_success "✅ DEPLOYMENT SUCCESSFUL!"
    print_success "🚀 Your white background changes are now live!"
    echo ""
    print_status "📱 Your deployment is available at:"
    print_status "   🌐 https://geoleadsenricher.vercel.app"
    echo ""
    print_success "🎉 White background fix is now deployed!"
else
    print_error "❌ Deployment failed"
    print_error "Please check the error messages above"
    exit 1
fi
