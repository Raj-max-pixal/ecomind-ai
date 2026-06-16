# Database Schema for Supabase

```sql
-- Auth (handled by Supabase Auth)

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT auth.uid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Extended user profiles (eco score, rewards, streaks)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  eco_score INTEGER DEFAULT 0,
  reward_points INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User memory for MemoryAgent (habits, goals, preferences)
CREATE TABLE user_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  travel_habits JSONB DEFAULT '[]',
  food_habits JSONB DEFAULT '[]',
  goals JSONB DEFAULT '[]',
  preferences JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carbon Footprint table
CREATE TABLE carbon_footprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  transport_emissions DECIMAL(10, 2) DEFAULT 0,
  food_emissions DECIMAL(10, 2) DEFAULT 0,
  shopping_emissions DECIMAL(10, 2) DEFAULT 0,
  energy_emissions DECIMAL(10, 2) DEFAULT 0,
  water_emissions DECIMAL(10, 2) DEFAULT 0,
  total_emissions DECIMAL(10, 2) DEFAULT 0,
  measurement_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities/Tracking table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  emissions_impact DECIMAL(10, 2),
  rating TEXT,
  date_logged TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenges table (daily and weekly)
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  target_reduction DECIMAL(10, 2),
  duration_days INTEGER,
  challenge_type TEXT NOT NULL DEFAULT 'daily' CHECK (challenge_type IN ('daily', 'weekly')),
  points_reward INTEGER DEFAULT 25,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Challenges table (progress and completion tracking)
CREATE TABLE user_challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  progress DECIMAL(5, 2) DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Posts table
CREATE TABLE community_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Community Post Likes table
CREATE TABLE post_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, post_id)
);

-- Carbon Predictions table (cached forecasts)
CREATE TABLE carbon_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  predicted_monthly_emissions DECIMAL(10, 2),
  current_annual_emissions DECIMAL(10, 2),
  optimized_annual_emissions DECIMAL(10, 2),
  reduction_potential_percent DECIMAL(5, 2),
  trend_direction TEXT,
  recommendation TEXT,
  confidence_score DECIMAL(5, 2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI Memory/Chat History
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helper function to increment reward points
CREATE OR REPLACE FUNCTION increment_reward_points(p_user_id UUID, p_points INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE user_profiles
  SET reward_points = reward_points + p_points,
      updated_at = NOW()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed default challenges
INSERT INTO challenges (id, title, description, category, target_reduction, duration_days, challenge_type, points_reward) VALUES
  ('ch-daily-1', 'Meatless Monday', 'Eat only plant-based meals today', 'food', 2, 1, 'daily', 25),
  ('ch-daily-2', 'Car-Free Commute', 'Use public transit, bike, or walk for your commute', 'transport', 5, 1, 'daily', 30),
  ('ch-weekly-1', 'Zero-Waste Week', 'Avoid single-use plastics for 7 days', 'shopping', 3, 7, 'weekly', 100),
  ('ch-weekly-2', 'Energy Saver', 'Reduce home energy use by 10% this week', 'energy', 4, 7, 'weekly', 75);

-- Indexes for performance
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_user_memory_user_id ON user_memory(user_id);
CREATE INDEX idx_carbon_footprints_user_id ON carbon_footprints(user_id);
CREATE INDEX idx_carbon_footprints_date ON carbon_footprints(user_id, measurement_date DESC);
CREATE INDEX idx_activities_user_id ON activities(user_id);
CREATE INDEX idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX idx_challenges_type ON challenges(challenge_type);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
```

## Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_memory ENABLE ROW LEVEL SECURITY;
ALTER TABLE carbon_footprints ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- User profiles policies
CREATE POLICY "Users can view their own extended profile" ON user_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own extended profile" ON user_profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own extended profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User memory policies
CREATE POLICY "Users can view their own memory" ON user_memory
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert their own memory" ON user_memory
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own memory" ON user_memory
  FOR UPDATE USING (auth.uid() = user_id);

-- Carbon footprints policies
CREATE POLICY "Users can view their own carbon data" ON carbon_footprints
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own carbon data" ON carbon_footprints
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own carbon data" ON carbon_footprints
  FOR UPDATE USING (auth.uid() = user_id);

-- Activities policies
CREATE POLICY "Users can view their own activities" ON activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own activities" ON activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" ON activities
  FOR UPDATE USING (auth.uid() = user_id);

-- User challenges policies
CREATE POLICY "Users can view their own challenges" ON user_challenges
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenges" ON user_challenges
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" ON user_challenges
  FOR UPDATE USING (auth.uid() = user_id);

-- Chat history policies
CREATE POLICY "Users can view their own chat history" ON chat_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chat messages" ON chat_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
```

## Migration Notes

If upgrading from the previous schema, run these ALTER statements:

```sql
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS challenge_type TEXT DEFAULT 'daily';
ALTER TABLE challenges ADD COLUMN IF NOT EXISTS points_reward INTEGER DEFAULT 25;
ALTER TABLE user_challenges ADD COLUMN IF NOT EXISTS points_earned INTEGER DEFAULT 0;
```

Then create the new `user_profiles` and `user_memory` tables using the CREATE statements above.
