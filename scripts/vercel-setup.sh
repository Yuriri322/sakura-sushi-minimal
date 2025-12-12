#!/bin/bash

# Vercel Environment Variables Setup Helper
# This script helps you prepare environment variables for Vercel deployment

echo "================================================"
echo "🚀 Sakura Sushi - Vercel Setup Helper"
echo "================================================"
echo ""
echo "This script will help you prepare environment variables"
echo "for deploying to Vercel."
echo ""

# Check if .env.dev exists
if [ ! -f ".env.dev" ]; then
    echo "❌ Error: .env.dev file not found!"
    echo "Please create .env.dev with your database credentials first."
    exit 1
fi

echo "✅ Found .env.dev file"
echo ""

# Source the .env.dev file
set -a
source .env.dev
set +a

echo "📋 Your Environment Variables:"
echo "================================================"
echo ""

# Display DATABASE_URL (masked)
if [ -n "$DATABASE_URL" ]; then
    # Extract and mask the password
    MASKED_URL=$(echo $DATABASE_URL | sed 's/:[^@]*@/:****@/g')
    echo "DATABASE_URL=$MASKED_URL"
else
    echo "❌ DATABASE_URL is not set!"
fi

# Display NEXT_PUBLIC_SUPABASE_URL
if [ -n "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL"
else
    echo "⚠️  NEXT_PUBLIC_SUPABASE_URL is not set"
fi

# Display NEXT_PUBLIC_SUPABASE_ANON_KEY (partially masked)
if [ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    MASKED_KEY="${NEXT_PUBLIC_SUPABASE_ANON_KEY:0:20}...${NEXT_PUBLIC_SUPABASE_ANON_KEY: -10}"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=$MASKED_KEY"
else
    echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
fi

echo ""
echo "================================================"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Go to: https://vercel.com/new"
echo "2. Import your GitHub repository"
echo "3. Add the following environment variables in Vercel:"
echo ""
echo "   Variable Name                    | Value"
echo "   -------------------------------- | -----"
echo "   DATABASE_URL                     | Copy from .env.dev"
echo "   NEXT_PUBLIC_SUPABASE_URL        | Copy from .env.dev"
echo "   NEXT_PUBLIC_SUPABASE_ANON_KEY   | Copy from .env.dev"
echo "   NODE_ENV                         | production"
echo ""
echo "4. Select environments: Production, Preview, Development"
echo "5. Click 'Deploy'"
echo ""
echo "⚠️  Important Security Notes:"
echo "   - Never commit .env files to Git"
echo "   - URL-encode special characters in DATABASE_URL password"
echo "   - DATABASE_URL should remain secret"
echo "   - NEXT_PUBLIC_* variables will be exposed to the browser"
echo ""
echo "📖 For detailed instructions, see: VERCEL_DEPLOYMENT.md"
echo ""
echo "================================================"
