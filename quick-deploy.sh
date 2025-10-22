#!/bin/bash

# 🚀 QUICK DEPLOYMENT SCRIPT
# For small changes that need immediate deployment

echo "🚀 QUICK DEPLOY TO VERCEL"
echo "========================"

# Commit any changes
git add .
git commit -m "Quick deploy: $(date '+%H:%M:%S')"

# Push to trigger Vercel deployment
echo "Pushing to GitHub..."
git push origin main

echo "✅ Deployed! Check: https://geoleadsenricher.vercel.app"
