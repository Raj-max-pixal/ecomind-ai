# EcoMind AI - Production-Ready Application

A complete carbon footprint tracking application with AI-powered insights, built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🌱 Features

### Core Features
- ✅ **Carbon Footprint Tracking** - Log and monitor daily emissions
- ✅ **AI Carbon Coach** - Qwen AI-powered personalized recommendations
- ✅ **Advanced Analytics** - Visual dashboards and trend analysis
- ✅ **Prediction Engine** - ML-based carbon emission forecasts
- ✅ **Activity Logger** - Track eco-friendly activities with ratings
- ✅ **Community Leaderboard** - Compete and collaborate with others
- ✅ **Eco Challenges** - Gamified sustainability goals
- ✅ **User Profiles** - Complete profile management and settings

### Technical Features
- 🔐 **Authentication** - NextAuth with Supabase
- 📊 **Real-time Data** - Live carbon calculations
- 🤖 **AI Integration** - Qwen API for smart coaching
- 📱 **Responsive Design** - Mobile-first UI
- ⚡ **Performance Optimized** - ISR, SSG, and incremental static regeneration
- 🔒 **Secure** - Row Level Security, HTTPS, environment variables
- 📈 **Scalable** - Serverless architecture with auto-scaling

## 📁 Project Structure

```
ecomind-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── globals.css         # Global styles
│   │   ├── dashboard/          # Dashboard page
│   │   ├── tracker/            # Activity tracker
│   │   ├── analytics/          # Advanced analytics
│   │   ├── aicoach/            # AI coach chat
│   │   ├── community/          # Community leaderboard
│   │   ├── profile/            # User profile
│   │   └── api/
│   │       ├── aicoach/        # AI coach endpoint
│   │       ├── carbon/         # Carbon tracking API
│   │       ├── community/      # Community posts API
│   │       └── predictions/    # Prediction engine API
│   ├── components/
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── TopBar.tsx          # Top navigation bar
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client & helpers
│   │   ├── qwen.ts             # Qwen AI integration
│   │   └── store.ts            # Zustand state management
│   └── types/
│       └── index.ts            # TypeScript types
├── DATABASE_SCHEMA.md          # Supabase schema
├── DEPLOYMENT.md               # Deployment guide
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.example

```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Database Setup
- Create Supabase project
- Run SQL schema from DATABASE_SCHEMA.md
- Configure RLS policies

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📚 Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Modules |
| Database | Supabase (PostgreSQL) |
| Auth | NextAuth.js |
| State | Zustand |
| AI/ML | Qwen (Alibaba Cloud) |
| Charts | Recharts |
| Hosting | Vercel |
| ORM | Supabase JavaScript Client |

## 🔑 Key APIs

### Carbon Tracking API
```typescript
POST /api/carbon
GET /api/carbon?userId={userId}
```

### AI Coach API
```typescript
POST /api/aicoach
Body: { message: string, carbonData?: object }
```

### Community API
```typescript
GET /api/community
POST /api/community
Body: { userId, title, content, imageUrl }
```

### Predictions API
```typescript
GET /api/predictions?userId={userId}
```

## 🔐 Security

- Row Level Security (RLS) on all tables
- Environment variables for sensitive data
- HTTPS enforced
- CSRF protection
- SQL injection prevention (Supabase client library)
- Rate limiting (can be added to API routes)

## 📊 Database Schema

### Main Tables
- `users` - User profiles
- `carbon_footprints` - Emission records
- `activities` - Logged activities
- `challenges` - Eco challenges
- `user_challenges` - User challenge progress
- `community_posts` - Community content
- `chat_history` - AI coach conversations
- `carbon_predictions` - Emission forecasts

See `DATABASE_SCHEMA.md` for full schema with indexes and RLS policies.

## 🧪 Testing & Quality

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## 📈 Performance Metrics

- Core Web Vitals optimized
- Images auto-optimized
- Code splitting enabled
- Database query optimization with indexes
- Caching strategies implemented

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
# Follow prompts
```

See `DEPLOYMENT.md` for detailed deployment instructions including Docker, AWS, and alternative options.

## 🐛 Error Handling

- API error boundaries
- User-friendly error messages
- Console error logging
- Sentry integration ready

## 📞 Support

For issues and questions:
1. Check `DEPLOYMENT.md` Troubleshooting section
2. Review API route implementations
3. Check database schema and RLS policies
4. Verify environment variables are set

## 📝 License

MIT

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 🎯 Roadmap

- [ ] Mobile app with React Native
- [ ] Advanced ML carbon predictions
- [ ] Social features expansion
- [ ] Carbon offset marketplace
- [ ] Integration with IoT devices
- [ ] Multi-language support
- [ ] Advanced reporting system
