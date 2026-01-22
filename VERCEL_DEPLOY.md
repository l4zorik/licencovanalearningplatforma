# Vercel Deployment Guide

## Quick Deploy (GitHub)

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository: `l4zorik/licencovanalearningplatforma`
4. Add Environment Variables (see below)
5. Click Deploy

## Environment Variables (required)

| Variable | Value | Note |
|----------|-------|------|
| `NEXTAUTH_SECRET` | Generated secret | Run: `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `https://your-project.vercel.app` | After first deploy |
| `DATABASE_URL` | PostgreSQL connection string | Use Vercel Postgres or Neon |

## Database Setup (Vercel Postgres)

1. In Vercel Dashboard > Storage > Create Database
2. Choose Postgres
3. Copy connection string to `DATABASE_URL`
4. Run migrations: `npx prisma migrate deploy`

## Alternative: Neon Database

1. Go to https://neon.tech and create account
2. Create new project
3. Copy connection string (format: `postgresql://user:pass@ep-xxx.region.neon.tech/database`)

## After First Deploy

1. Update `NEXTAUTH_URL` in Vercel with your actual domain
2. Run `npx prisma db push` if needed
3. Test authentication

## Troubleshooting

- **Build fails**: Check `npm run build` locally first
- **Database errors**: Ensure `DATABASE_URL` is set correctly
- **Auth errors**: Verify `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
