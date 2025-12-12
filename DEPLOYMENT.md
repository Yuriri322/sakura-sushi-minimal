# Production Deployment Checklist

## Pre-Deployment

### Environment Variables

- [ ] Set `DATABASE_URL` in production environment
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` if using Supabase storage
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` if using Supabase storage
- [ ] Set `NODE_ENV=production`

### Database

- [ ] Run migrations: `npm run db:push:prod`
- [ ] Seed database with menu items: `npm run db:seed`
- [ ] Verify database connection is working
- [ ] Check indexes are in place for optimal query performance

### Code Quality

- [ ] Run type checking: `npm run type-check`
- [ ] Run linting: `npm run lint:fix`
- [ ] Test build locally: `npm run build`
- [ ] Verify no console.log statements in production code

### Performance

- [ ] Images are optimized and uploaded to Supabase storage
- [ ] All menu items have proper slugs for SEO-friendly URLs
- [ ] ISR (revalidate) is configured on pages (30 minutes)
- [ ] Verify bundle size is optimized

### Security

- [ ] Security headers are configured in next.config.ts
- [ ] No sensitive data in client-side code
- [ ] Database credentials are secure
- [ ] HTTPS is enforced

## Deployment

### Build & Deploy

- [ ] Push to production branch
- [ ] Verify Vercel/hosting platform auto-deployment
- [ ] Monitor build logs for errors
- [ ] Check build time and size

### Post-Deployment Verification

- [ ] Test homepage loads correctly
- [ ] Test menu page with filters
- [ ] Test language switching (EN/BG)
- [ ] Test category navigation
- [ ] Test tag filters and allergen exclusion
- [ ] Verify images load properly
- [ ] Check mobile responsiveness
- [ ] Test page load performance (Lighthouse score)
- [ ] Verify meta tags and SEO

## Monitoring

### Performance Metrics

- [ ] Monitor Core Web Vitals
- [ ] Check server response times
- [ ] Monitor database query performance
- [ ] Track error rates

### Analytics (Optional)

- [ ] Set up Google Analytics or alternative
- [ ] Configure conversion tracking
- [ ] Monitor user behavior

## Rollback Plan

- [ ] Document current deployment commit hash
- [ ] Know how to rollback to previous version
- [ ] Have database backup strategy

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review and optimize database queries
- [ ] Monitor disk space and database size
- [ ] Check for Next.js updates
- [ ] Review error logs weekly

### Content Updates

- [ ] Menu items can be updated via seed script
- [ ] Images should be optimized before upload
- [ ] Translations should be reviewed for accuracy
