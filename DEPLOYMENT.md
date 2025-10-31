# 🚀 Deployment Guide - Vercel + Database

## Overview
Your Next.js app (frontend + backend API routes) deploys automatically on Vercel.
Your MySQL database needs separate setup.

---

## Option 1: PlanetScale (Recommended - Free Tier Available)

### Step 1: Create PlanetScale Account
1. Go to https://planetscale.com
2. Sign up (can use GitHub)
3. Create new database: `gamecore`

### Step 2: Get Connection String
1. Click "Connect" on your database
2. Select "Prisma" from framework dropdown
3. Copy the `DATABASE_URL` connection string

### Step 3: Add to Vercel
1. Go to your Vercel project dashboard
2. Settings → Environment Variables
3. Add variable:
   - Name: `DATABASE_URL`
   - Value: (paste PlanetScale connection string)
4. Select all environments (Production, Preview, Development)
5. Click "Save"

### Step 4: Update Prisma Schema for PlanetScale
```prisma
// prisma/schema.prisma
datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"  // Add this for PlanetScale
}
```

### Step 5: Deploy Migrations
```bash
# Push schema to PlanetScale
npx prisma db push
```

### Step 6: Redeploy Vercel
```bash
git add .
git commit -m "Configure for PlanetScale"
git push origin master
```

Vercel will automatically redeploy!

---

## Option 2: Railway (Easy MySQL Hosting)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project → Deploy MySQL

### Step 2: Get Connection String
1. Click your MySQL service
2. Go to "Connect" tab
3. Copy the `DATABASE_URL` (starts with `mysql://`)

### Step 3: Add to Vercel
1. Vercel project → Settings → Environment Variables
2. Add:
   - Name: `DATABASE_URL`
   - Value: (paste Railway connection string)
3. Save

### Step 4: Run Migrations
```bash
# Set your Railway DATABASE_URL temporarily
export DATABASE_URL="mysql://..."  # Mac/Linux
$env:DATABASE_URL="mysql://..."    # Windows PowerShell

# Run migrations
npx prisma migrate deploy
```

### Step 5: Deploy
```bash
git push origin master
```

---

## Option 3: Keep Local MySQL (Development Only)

**NOT RECOMMENDED for production** but works for testing:

### Step 1: Expose Your Local MySQL
⚠️ Security risk - only for temporary testing!

```bash
# Make MySQL accessible from internet (not recommended)
# Or use ngrok to tunnel
ngrok tcp 3306
```

### Step 2: Update Vercel Environment Variable
```
   password=mypassword
   ```

   WARNING: Security risk - only for temporary testing!
```

---

## 📋 Vercel Environment Variables Checklist

Required variables:
In Vercel's environment variables, you need:

- `DATABASE_URL` - Your database connection string

Example for Railway PostgreSQL:

Optional variables:
- `NEXT_PUBLIC_API_URL` - Usually not needed (uses relative URLs)
- `NODE_ENV` - Automatically set by Vercel

---

## 🔍 Verify Deployment

### 1. Check Vercel Build Logs
- Go to Vercel dashboard → Deployments
- Click latest deployment
- Check "Building" logs for errors

### 2. Test API Endpoints
```bash
# Test if backend is working
curl https://your-app.vercel.app/api/games
```

### 3. Check Prisma Connection
Look in Vercel function logs for database errors

---

## 🐛 Common Issues

### Issue: "PrismaClientInitializationError"
**Cause:** Database URL not set or incorrect
**Solution:** 
- Check environment variable in Vercel settings
- Ensure DATABASE_URL is in ALL environments
- Redeploy after adding

### Issue: "Can't reach database server"
**Cause:** Database not accepting connections
**Solution:**
- Check if database is running
- Verify IP whitelist (PlanetScale/Railway allow all by default)
- Test connection string locally first

### Issue: "Migration files not found"
**Cause:** Using `prisma migrate deploy` without migrations
**Solution:**
- Use `npx prisma db push` for PlanetScale (no migrations)
- Or commit your `prisma/migrations` folder

### Issue: Build succeeds but API returns 500
**Cause:** Missing Prisma Client generation
**Solution:** Vercel auto-runs `prisma generate`, but verify in build logs

---

## 📊 Database Management

### View Production Data
```bash
# Set DATABASE_URL to production
export DATABASE_URL="your-production-url"

# Open Prisma Studio
npx prisma studio
```

### Backup Production Database
```bash
# PlanetScale: Use their backup feature in dashboard
# Railway: Go to database → Backups
# Manual backup:
mysqldump -h host -u user -p database > backup.sql
```

### Seed Production Database
```bash
# Create seed script: prisma/seed.ts
npx prisma db seed
```

---

## 🔐 Security Best Practices

1. **Never commit `.env` file**
   ```bash
   # Ensure .gitignore includes:
   .env
   .env.local
   .env*.local
   ```

2. **Use strong database passwords**
   - Auto-generated passwords from Railway/PlanetScale are good
   - Don't use `gamecore1` in production!

3. **Enable SSL for database connections**
   ```
   DATABASE_URL="mysql://...?sslmode=require"
   ```

4. **Restrict database access**
   - PlanetScale/Railway: Allow only Vercel IPs (if possible)
   - Use separate databases for dev/staging/production

---

## 🎯 Production Checklist

Before going live:
- [ ] Production database created
- [ ] DATABASE_URL added to Vercel
- [ ] Migrations applied to production DB
- [ ] Test all API endpoints work
- [ ] Check Vercel function logs for errors
- [ ] Add admin user to production database
- [ ] Set up database backups
- [ ] Review security settings
- [ ] Test signup/login flows
- [ ] Verify games can be added/deleted

---

## 📱 Monitoring

### Vercel Analytics
- Enable in Vercel dashboard → Analytics
- Monitor API route performance

### Database Monitoring
- PlanetScale: Built-in query insights
- Railway: Basic metrics in dashboard

### Error Tracking (Optional)
- Sentry: `npm install @sentry/nextjs`
- LogRocket: Frontend + backend monitoring

---

## 🔄 Continuous Deployment

Your setup:
```
Git Push → GitHub → Vercel Auto-Deploy
```

Every push to `master` automatically:
1. Builds your Next.js app
2. Runs `prisma generate`
3. Deploys frontend + API routes
4. Updates environment

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **PlanetScale Docs:** https://planetscale.com/docs
- **Railway Docs:** https://docs.railway.app

---

## Quick Commands Reference

```bash
# Local development
npm run dev

# Build locally (test before deploy)
npm run build

# Apply migrations to production
DATABASE_URL="prod-url" npx prisma migrate deploy

# Push schema without migrations (PlanetScale)
DATABASE_URL="prod-url" npx prisma db push

# View production data
DATABASE_URL="prod-url" npx prisma studio

# Force Vercel redeploy
git commit --allow-empty -m "Trigger deploy"
git push origin master
```
