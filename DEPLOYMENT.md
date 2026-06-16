# EcoMind AI - Production Deployment Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Supabase account
- Qwen API key (Alibaba Cloud)
- Vercel account (for deployment)

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
cd EcoMind AI
npm install
```

### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Qwen API
NEXT_PUBLIC_QWEN_API_KEY=your_qwen_api_key

# Database
DATABASE_URL=your_database_connection_string
```

### 3. Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Run the database schema from `DATABASE_SCHEMA.md`:
   ```bash
   # Via Supabase dashboard SQL editor, paste contents of DATABASE_SCHEMA.md
   ```
3. Enable Authentication:
   - Go to Authentication → Providers
   - Enable Email provider
   - (Optional) Enable OAuth providers (Google, GitHub)

4. Enable Row Level Security:
   ```bash
   npm run db:push
   ```

### 4. Qwen API Setup

1. Sign up at Alibaba Cloud DashScope: https://dashscope.aliyuncs.com
2. Create API key for Qwen model
3. Add key to `.env.local`

### 5. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Deployment to Vercel

### 1. Build for Production

```bash
npm run build
```

### 2. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### 3. Configure Environment Variables in Vercel

In Vercel Dashboard → Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_QWEN_API_KEY`

### 4. Enable Continuous Deployment

Connect your GitHub repo to Vercel for automatic deployments on push.

## Alternative Deployment Options

### Docker Deployment

```dockerfile
# Create Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and push:
```bash
docker build -t ecomind-ai .
docker run -p 3000:3000 ecomind-ai
```

### AWS Deployment (Amplify)

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize
amplify init

# Deploy
amplify publish
```

## Performance Optimization

### 1. Image Optimization
- Images are automatically optimized by Next.js
- Use `next/image` for all images

### 2. Database Indexing
Indexes are created in DATABASE_SCHEMA.md. Key indexes:
- `carbon_footprints(user_id)`
- `activities(user_id)`
- `user_challenges(user_id)`
- `community_posts(user_id)`
- `chat_history(user_id)`

### 3. API Response Caching

```typescript
// In API routes
response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
```

### 4. Database Queries Optimization
- Use `.select()` to fetch only needed columns
- Use `.limit()` to paginate results
- Create composite indexes for common queries

## Monitoring & Analytics

### 1. Vercel Analytics
```bash
# Already integrated with Vercel deployment
```

### 2. Supabase Monitoring
- Check Dashboard → Logs for database queries
- Monitor Edge Functions performance
- Set up alerts for high latency

### 3. Error Tracking (Sentry Optional)

```bash
npm install @sentry/nextjs

# Initialize in next.config.js
```

## Security Best Practices

1. **API Keys**: Never commit `.env.local`, use `.env.example`
2. **CORS**: Configure allowed origins in Supabase
3. **RLS**: Row Level Security policies enabled by default
4. **HTTPS**: Enforced on Vercel
5. **Rate Limiting**: Implement on API routes if needed

## Database Migrations

### Backup Database
```bash
# Export from Supabase dashboard or:
pg_dump <DATABASE_URL> > backup.sql
```

### Apply Schema Updates
```bash
npm run db:push
```

## Scaling Considerations

1. **Database**: Supabase auto-scales, monitor connection pool
2. **Storage**: Use Supabase Storage for images
3. **API**: Vercel serverless functions auto-scale
4. **Caching**: Implement Redis for frequent queries (optional)

## Troubleshooting

### Common Issues

1. **Supabase connection error**
   - Verify `.env.local` credentials
   - Check firewall/IP restrictions

2. **Qwen API errors**
   - Verify API key is valid
   - Check rate limits
   - Ensure request format is correct

3. **Build failures**
   ```bash
   npm run type-check
   npm run lint
   ```

4. **Performance issues**
   - Check Vercel Analytics
   - Review Supabase slow query logs
   - Optimize database queries

## Support & Resources

- Next.js Docs: https://nextjs.org/docs
- Supabase Docs: https://supabase.com/docs
- Vercel Docs: https://vercel.com/docs
- Qwen API: https://dashscope.aliyuncs.com/api-intro.html
