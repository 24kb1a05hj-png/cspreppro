-- Profiles Table
CREATE TABLE public.profiles (
  id uuid NOT NULL REFERENCES auth.users on delete cascade,
  full_name text,
  avatar_url text,
  streak_count int DEFAULT 0,
  last_login_date timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Interviews Table
CREATE TABLE public.interviews (
  id uuid DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) on delete cascade NOT NULL,
  track text NOT NULL,
  final_score numeric,
  integrity_score numeric,
  violations_count int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Interview Responses Table
CREATE TABLE public.interview_responses (
  id uuid DEFAULT gen_random_uuid(),
  interview_id uuid REFERENCES public.interviews(id) on delete cascade NOT NULL,
  question_title text,
  code_submission text,
  transcript_text text,
  ai_feedback text,
  PRIMARY KEY (id)
);

-- Quiz Records Table
CREATE TABLE public.quiz_records (
  id uuid DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) on delete cascade NOT NULL,
  category text,
  score numeric,
  completed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_records ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile." ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own interviews." ON public.interviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own interviews." ON public.interviews FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own interview responses." ON public.interview_responses FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.interviews i WHERE i.id = interview_id AND i.user_id = auth.uid())
);
CREATE POLICY "Users can insert own interview responses." ON public.interview_responses FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.interviews i WHERE i.id = interview_id AND i.user_id = auth.uid())
);

CREATE POLICY "Users can view own quiz records." ON public.quiz_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz records." ON public.quiz_records FOR INSERT WITH CHECK (auth.uid() = user_id);
