#!/bin/bash

echo "🚀 Pushing changes to GitHub..."

# Set up git config
git config --global user.name "miguelstasher"
git config --global user.email "miguel@stasher.com"

# Add all changes
git add .

# Commit changes
git commit -m "ULTRA-AGGRESSIVE: Force white background everywhere - fix black dashboard"

# Try to push
echo "📤 Attempting to push to GitHub..."
echo "You may need to enter your GitHub credentials"

git push -u origin main

echo "✅ Done! Check your Vercel dashboard for automatic deployment"
