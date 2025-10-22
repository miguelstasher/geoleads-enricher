#!/bin/bash

# 🔧 VERCEL SETUP SCRIPT
# This script sets up Vercel CLI authentication

echo "🔧 SETTING UP VERCEL CLI"
echo "======================="

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

print_status "Setting up Vercel CLI authentication..."

# Check if already logged in
if vercel whoami > /dev/null 2>&1; then
    print_success "✅ Already logged into Vercel"
    vercel whoami
else
    print_warning "🔐 You need to login to Vercel"
    print_status "This will open a browser window for authentication..."
    vercel login
fi

print_success "✅ Vercel CLI is ready!"
print_status "You can now run: ./deploy-now.sh"
