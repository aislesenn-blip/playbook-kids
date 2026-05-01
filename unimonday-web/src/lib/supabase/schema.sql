-- Supabase Schema for Unimonday: Nursery University

-- 1. Profiles Table (Parents and Students)
CREATE TABLE profiles (
  -- Removed REFERENCES auth.users(id) so we can use simulated UUIDs
  id UUID PRIMARY KEY,
  parent_name TEXT NOT NULL,
  student_name TEXT NOT NULL,
  learning_level TEXT NOT NULL CHECK (learning_level IN ('First Words', 'Sentences', 'Advanced')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Modules Table (The Learning Path)
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  icon_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Lessons Table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module_id UUID REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Speaking', 'Writing')),
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Vocabulary Table (The words to learn)
CREATE TABLE vocabulary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  word TEXT NOT NULL,
  image_url TEXT NOT NULL,
  pronunciation_target TEXT NOT NULL, -- Simplified phonetics if needed
  spelling_target TEXT NOT NULL, -- Target for writing
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Student Progress Table (Real-time tracking)
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('Started', 'Completed')),
  score INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0.00,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Student Stats View (For the Profile page)
CREATE OR REPLACE VIEW student_stats AS
SELECT
  student_id,
  COUNT(CASE WHEN status = 'Completed' THEN 1 END) as lessons_completed,
  AVG(accuracy_percentage) as average_accuracy,
  SUM(score) as total_score
FROM student_progress
GROUP BY student_id;

-- Row Level Security (RLS)
-- We disable RLS to allow the app to work fully functional end to end with anonymous UUIDs until real auth is hooked up.
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE modules DISABLE ROW LEVEL SECURITY;
ALTER TABLE lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE vocabulary DISABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress DISABLE ROW LEVEL SECURITY;
