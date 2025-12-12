# Vercel Deployment Guide

This guide will help you deploy the Sakura Sushi application to Vercel.

## Prerequisites

1. GitHub account with the repository pushed
2. Vercel account (sign up at https://vercel.com)
3. Database credentials (Supabase or PostgreSQL)

## Step 1: Import Project to Vercel

1. Go to https://vercel.com/new
2. Click **"Import Git Repository"**
3. Select your GitHub repository: `Yuriri322/sakura-sushi-minimal`
4. Click **"Import"**

## Step 2: Configure Project Settings

### Framework Preset
- Vercel should auto-detect **Next.js**
- Keep the default settings

### Root Directory
- Leave as **`.`** (root)

### Build & Development Settings
- **Build Command:** `yarn build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `yarn install` (auto-detected)
- **Development Command:** `yarn dev` (auto-detected)

## Step 3: Environment Variables

Click **"Add Environment Variables"** and add the following:

### Required Variables

```bash
# Database Connection
DATABASE_URL=postgresql://your-user:your-password@your-host:5432/your-database

# Supabase (if using Supabase storage)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Node Environment (automatically set by Vercel, but you can override)
NODE_ENV=production
```

### How to Add Each Variable:

1. Enter **Key:** `DATABASE_URL`
2. Enter **Value:** Your database connection string
3. Select environments: ✅ Production, ✅ Preview, ✅ Development
4. Click **"Add"**
5. Repeat for each variable

### Finding Your Database URL

**For Supabase:**
1. Go to your Supabase project
2. Settings → Database → Connection string
3. Choose **"Transaction"** mode for better performance
4. Copy the connection string (format: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`)

**Note:** Make sure to URL-encode special characters in your password:
- `@` → `%40`
- `!` → `%21`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`

## Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (~2-3 minutes)
3. Vercel will provide a deployment URL

## Step 5: Post-Deployment Setup

### Initialize Database

Once deployed, you need to seed your database:

**Option 1: Local Script (Recommended)**
```bash
# Set environment to production
export NODE_ENV=production

# Or use the production env file
ENV=prod npm run db:seed
```

**Option 2: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Link to your project
vercel link

# Run seed script
vercel env pull .env.production.local
npm run db:seed
```

### Verify Deployment

1. Visit your Vercel URL
2. Check homepage loads correctly
3. Test language switching (EN/BG)
4. Verify menu items display
5. Test filters and search

## Step 6: Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain
4. Follow DNS configuration instructions
5. Wait for DNS propagation (~10 minutes to 24 hours)

## Production Checklist

- [ ] All environment variables are set
- [ ] Database is accessible from Vercel
- [ ] Database has been seeded with menu items
- [ ] Homepage loads without errors
- [ ] Menu page displays items correctly
- [ ] Images load from Supabase storage
- [ ] Language switching works (EN/BG)
- [ ] Filters and search function properly
- [ ] Mobile view is responsive
- [ ] Security headers are active (check Network tab)
- [ ] Core Web Vitals are good (Lighthouse audit)

## Continuous Deployment

Vercel automatically deploys on every push to `main` branch:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Preview deployments for pull requests

## Environment-Specific Deployments

### Production (main branch)
- Automatically deployed to production URL
- Uses production environment variables

### Preview (other branches/PRs)
- Creates preview deployment with unique URL
- Uses preview environment variables
- Perfect for testing before merging

### Development
- Local development only
- Uses `.env.dev` file

## Monitoring & Analytics

### Built-in Analytics
1. Go to Vercel dashboard → **Analytics**
2. View Core Web Vitals, traffic, and performance

### Error Monitoring (Optional)
Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **Datadog** for APM

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to Vercel dashboard → **Deployments**
2. Click on failed deployment
3. Review build logs

**Common issues:**
- Missing environment variables
- TypeScript errors
- Database connection issues

### Runtime Errors

**Check function logs:**
1. Go to Vercel dashboard → **Logs**
2. Filter by error level
3. Check function execution logs

### Database Connection Issues

**Verify:**
- DATABASE_URL is correct and URL-encoded
- Database allows connections from Vercel IPs (0.0.0.0/0 for Supabase)
- Connection pooling is configured correctly

### Images Not Loading

**Check:**
- Supabase storage is public
- Image URLs are correct in database
- CORS is configured in Supabase

## Performance Optimization

Already configured:
- ✅ ISR with 30-minute revalidation
- ✅ Image optimization (WebP/AVIF)
- ✅ Compression enabled
- ✅ Security headers
- ✅ React Compiler

Additional optimizations:
- Enable Vercel Analytics
- Use Vercel Edge Network (automatic)
- Monitor Core Web Vitals
- Optimize bundle size

## Useful Vercel Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link local project to Vercel
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# Pull environment variables
vercel env pull

# List deployments
vercel ls
```

## Cost

**Vercel Hobby Plan (Free):**
- Unlimited deployments
- Automatic HTTPS
- 100 GB bandwidth per month
- Serverless functions
- Perfect for personal projects

**Pro Plan ($20/month):**
- More bandwidth
- Advanced analytics
- Team collaboration
- Better for production apps

## Support

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **GitHub Issues:** https://github.com/Yuriri322/sakura-sushi-minimal/issues

## Next Steps After Deployment

1. Set up custom domain
2. Configure analytics
3. Set up error monitoring
4. Enable preview deployments for PRs
5. Create production backup strategy
6. Set up monitoring alerts
7. Document deployment process for team

---

**Your Sakura Sushi app is now live on Vercel! 🎉🚀**
