# 🚀 Quick Start Guide - EcoMind AI

Get your production-ready EcoMind AI application up and running in 5 minutes.

## Step 1: Install Dependencies (1 min)

```bash
cd "d:\EcoMind AI"
npm install
```

## Step 2: Setup Environment (2 min)

Create `.env.local` file:

```bash
# Copy the example
cp .env.example .env.local

# Or manually create .env.local with:
NEXTAUTH_SECRET=your-random-secret-key-here-min-32-chars
NEXTAUTH_URL=http://localhost:3000
```

## Step 3: Run Development Server (1 min)

```bash
npm run dev
```

Visit: **http://localhost:3000**

## Step 4: Explore the App (1 min)

- Landing page: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- AI Coach: http://localhost:3000/aicoach
- Analytics: http://localhost:3000/analytics
- Community: http://localhost:3000/community
- Profile: http://localhost:3000/profile
- Tracker: http://localhost:3000/tracker

## 📚 Full Setup with Supabase (10 min)

### 1. Create Supabase Project
- Go to https://supabase.com
- Create new project
- Get your `SUPABASE_URL` and `SUPABASE_ANON_KEY`

### 2. Setup Database

In Supabase Dashboard → SQL Editor:
1. Open `DATABASE_SCHEMA.md`
2. Copy the SQL
3. Paste in SQL editor
4. Click "Run"

### 3. Update Environment

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 4. Get Qwen API Key (Optional)

1. Sign up at https://dashscope.aliyuncs.com
2. Create API key
3. Add to `.env.local`:

```env
NEXT_PUBLIC_QWEN_API_KEY=your_qwen_key_here
```

### 5. Restart Development Server

```bash
npm run dev
```

## 📁 Project Structure

```
ecomind-ai/
├── src/
│   ├── app/              # Pages and API routes
│   ├── components/       # React components
│   ├── lib/             # Utilities and services
│   └── types/           # TypeScript types
├── DATABASE_SCHEMA.md   # Database setup
├── DEPLOYMENT.md        # Deployment guide
├── README.md            # Full documentation
└── package.json         # Dependencies
```

## 🔧 Common Commands

```bash
npm run dev              # Start development
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Check code quality
npm run type-check       # TypeScript validation
```

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Check types
npm run type-check
```

## 📖 Documentation

- **Full Guide**: See `README.md`
- **Deployment**: See `DEPLOYMENT.md`
- **Database**: See `DATABASE_SCHEMA.md`
- **Summary**: See `CONVERSION_SUMMARY.md`

## ✅ What's Included

✅ Landing page with CTA
✅ Dashboard with charts
✅ Activity tracker
✅ Analytics dashboard
✅ AI coach chat interface
✅ Community leaderboard
✅ User profile
✅ REST API routes
✅ Database schema
✅ TypeScript setup
✅ Tailwind CSS
✅ Responsive design
✅ Error handling

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Follow the prompts and set environment variables in Vercel dashboard.

## 💡 Next Steps

1. **Explore the code** - Check `src/app/dashboard/page.tsx`
2. **Connect database** - Setup Supabase
3. **Customize UI** - Edit colors in `tailwind.config.ts`
4. **Add features** - Build new pages and API routes
5. **Deploy** - Use Vercel for production

## 📞 Need Help?

1. Check `README.md` for full documentation
2. See `DEPLOYMENT.md` for troubleshooting
3. Review `CONVERSION_SUMMARY.md` for architecture
4. Check API route implementations in `src/app/api/`

---

**Status**: ✅ Ready to use immediately

You now have a production-ready Next.js 15 application!
