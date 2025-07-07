-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Add trigger for timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (new.id, new.raw_user_meta_data->>'username');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update guides table to track authors by user_id
ALTER TABLE public.guides ADD COLUMN created_by UUID REFERENCES auth.users(id);
ALTER TABLE public.comments ADD COLUMN created_by UUID REFERENCES auth.users(id);

-- Update RLS policies for authenticated operations
DROP POLICY "Anyone can create guides" ON public.guides;
DROP POLICY "Anyone can update guides" ON public.guides; 
DROP POLICY "Anyone can delete guides" ON public.guides;
DROP POLICY "Anyone can create comments" ON public.comments;
DROP POLICY "Anyone can delete comments" ON public.comments;

-- Create authenticated policies
CREATE POLICY "Authenticated users can create guides" 
ON public.guides 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own guides" 
ON public.guides 
FOR UPDATE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own guides" 
ON public.guides 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Authenticated users can create comments" 
ON public.comments 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can delete their own comments" 
ON public.comments 
FOR DELETE 
TO authenticated
USING (auth.uid() = created_by);