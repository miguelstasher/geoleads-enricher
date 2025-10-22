#!/bin/bash

# 🚀 FORCE DEPLOYMENT SCRIPT
# This script forces a new deployment by creating a small change

echo "🚀 FORCING NEW DEPLOYMENT"
echo "========================"

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

print_status "Forcing new deployment with timestamp..."

# Create a small change to trigger deployment
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
echo "/* FORCE DEPLOYMENT - $TIMESTAMP */" >> src/app/layout.tsx

# Commit and push
git add .
git commit -m "FORCE DEPLOY: White background fix - $TIMESTAMP"
git push origin main

print_success "✅ Changes pushed to GitHub!"
print_status "Vercel should now detect the new commit and deploy automatically"
print_status "Check your Vercel dashboard in 2-3 minutes"
print_status "Your site: https://geoleadsenricher.vercel.app"
