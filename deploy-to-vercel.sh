#!/bin/bash

# 🚀 COMPREHENSIVE VERCEL DEPLOYMENT SCRIPT
# This script handles both GitHub push and Vercel deployment

echo "🚀 DEPLOYING TO VERCEL - GeoLeads Enricher"
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
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
    print_error "Not in the project root directory. Please run from /Users/miguelelias/Desktop/salestool"
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Check git status
print_status "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    print_warning "You have uncommitted changes. Committing them now..."
    git add .
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S') - Auto-deployment"
    print_success "Changes committed"
else
    print_success "Working directory is clean"
fi

# Step 2: Push to GitHub (this triggers Vercel auto-deployment)
print_status "Pushing to GitHub repository..."
print_warning "You'll need to enter your GitHub credentials:"
print_warning "Username: miguelstasher"
print_warning "Password: Use your GitHub Personal Access Token (not your GitHub password)"
print_warning "Get token from: https://github.com/settings/tokens"

echo ""
print_status "Pushing to origin main..."
git push origin main

if [ $? -eq 0 ]; then
    print_success "✅ Successfully pushed to GitHub!"
    print_success "🚀 Vercel will automatically deploy your changes"
    echo ""
    print_status "📱 Your deployment will be available at:"
    print_status "   🌐 https://geoleadsenricher.vercel.app"
    print_status "   🔗 https://geoleadsenricher-fwpotklj4-miguel-elias-projects.vercel.app"
    echo ""
    print_status "⏱️  Deployment usually takes 2-3 minutes"
    print_status "📊 Monitor progress at: https://vercel.com/miguel-elias-projects/geoleadsenricher"
else
    print_error "❌ Failed to push to GitHub"
    print_error "Please check your GitHub credentials and try again"
    exit 1
fi

echo ""
print_success "🎉 DEPLOYMENT INITIATED!"
print_status "Next steps:"
echo "1. Wait 2-3 minutes for Vercel to build and deploy"
echo "2. Visit https://geoleadsenricher.vercel.app to see your changes"
echo "3. Check deployment status at https://vercel.com/miguel-elias-projects/geoleadsenricher"
echo ""
print_success "Your GeoLeads Enricher is being deployed! 🚀"
