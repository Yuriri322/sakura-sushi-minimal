# Vercel Deployment Quick Checklist ✅

Use this checklist when deploying Sakura Sushi to Vercel.

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] All tests pass locally (`npm run type-check`)
- [ ] Production build works (`npm run build`)
- [ ] Database credentials are ready
- [ ] Supabase project is set up (if using)

## Vercel Setup

- [ ] Go to [vercel.com/new](https://vercel.com/new)
- [ ] Import GitHub repository: `Yuriri322/sakura-sushi-minimal`
- [ ] Framework: Next.js (auto-detected)
- [ ] Root directory: `.` (default)

## Environment Variables

Add these in Vercel → Settings → Environment Variables:

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase URL
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- [ ] Select environments: ✅ Production ✅ Preview ✅ Development

**💡 Tip:** Run `./scripts/vercel-setup.sh` to see your current env vars

## Deploy

- [ ] Click **"Deploy"** button
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Check deployment logs for errors

## Post-Deployment

- [ ] Visit deployment URL
- [ ] Verify homepage loads
- [ ] Check menu page displays items
- [ ] Test language switching (EN/BG)
- [ ] Verify images load correctly
- [ ] Test filters and search
- [ ] Check mobile responsiveness

## Database Setup

- [ ] Seed database with menu items:
  ```bash
  ENV=prod npm run db:seed
  ```
- [ ] Verify menu items appear on site

## Performance Check

- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Verify security headers (DevTools → Network → Headers)
- [ ] Test page load speed

## Optional Enhancements

- [ ] Add custom domain (Settings → Domains)
- [ ] Enable Vercel Analytics (Settings → Analytics)
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure deployment notifications (Settings → Notifications)
- [ ] Enable preview deployments for PRs

## Troubleshooting

If deployment fails:

1. **Check build logs** - Vercel Dashboard → Deployments → View logs
2. **Verify env vars** - Settings → Environment Variables
3. **Test database connection** - Check DATABASE_URL format
4. **Review error messages** - Look for missing dependencies or type errors

Common issues:
- ❌ Missing environment variables → Add them in Settings
- ❌ Database connection fails → Check URL format and encoding
- ❌ Build errors → Run `npm run build` locally first
- ❌ Images not loading → Verify Supabase storage is public

## Success Criteria

✅ All checkboxes above are completed
✅ Site is accessible at Vercel URL
✅ No console errors in browser
✅ All pages load correctly
✅ Menu items display with images
✅ Language switching works
✅ Mobile view is responsive

## Next Steps

Once deployed successfully:

1. Update README with live demo URL
2. Test thoroughly on different devices
3. Monitor analytics and performance
4. Set up monitoring alerts
5. Plan content updates

---

**Need help?** See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed instructions.

**Repository:** https://github.com/Yuriri322/sakura-sushi-minimal
**Vercel Docs:** https://vercel.com/docs
