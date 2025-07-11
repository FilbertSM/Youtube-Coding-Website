-- Create guides table for storing YouTube coding guide data
CREATE TABLE public.guides (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  authors TEXT[] NOT NULL DEFAULT '{}',
  views INTEGER DEFAULT 0,
  duration TEXT,
  likes INTEGER DEFAULT 0,
  thumbnail TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create comments table for guide comments
CREATE TABLE public.comments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
  user_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public website)
CREATE POLICY "Guides are viewable by everyone" 
ON public.guides 
FOR SELECT 
USING (true);

CREATE POLICY "Comments are viewable by everyone" 
ON public.comments 
FOR SELECT 
USING (true);

-- Create policies for inserting new guides and comments (public can create)
CREATE POLICY "Anyone can create guides" 
ON public.guides 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can create comments" 
ON public.comments 
FOR INSERT 
WITH CHECK (true);

-- Create policies for updating and deleting (public for now, can be restricted later)
CREATE POLICY "Anyone can update guides" 
ON public.guides 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete guides" 
ON public.guides 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can delete comments" 
ON public.comments 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_guides_updated_at
  BEFORE UPDATE ON public.guides
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_guides_title ON public.guides USING GIN(to_tsvector('english', title));
CREATE INDEX idx_guides_tags ON public.guides USING GIN(tags);
CREATE INDEX idx_guides_created_at ON public.guides(created_at DESC);
CREATE INDEX idx_comments_guide_id ON public.comments(guide_id);

-- Insert sample data
INSERT INTO public.guides (title, content, authors, views, duration, likes, tags) VALUES
('Complete React.js Tutorial for Beginners', 'Learn React.js from scratch with this comprehensive tutorial. We''ll cover components, state management, hooks, and building your first React application. This guide includes hands-on examples and real-world projects to help you master React development.', ARRAY['John Doe', 'Jane Smith'], 15420, '45 min', 892, ARRAY['React', 'JavaScript', 'Frontend', 'Beginner']),
('Node.js API Development with Express', 'Build scalable RESTful APIs using Node.js and Express.js. This tutorial covers routing, middleware, authentication, database integration, and best practices for API development. Perfect for backend developers looking to enhance their skills.', ARRAY['Mike Johnson'], 8750, '60 min', 456, ARRAY['Node.js', 'Express', 'Backend', 'API', 'Intermediate']),
('JavaScript ES6+ Features You Must Know', 'Explore modern JavaScript features including arrow functions, destructuring, async/await, modules, and more. This guide will help you write cleaner, more efficient JavaScript code using the latest ES6+ syntax and features.', ARRAY['Sarah Wilson', 'Alex Chen'], 12300, '35 min', 678, ARRAY['JavaScript', 'ES6', 'Modern JS', 'Intermediate']),
('MongoDB Database Design and Operations', 'Master MongoDB database design, queries, and operations. Learn about collections, documents, indexing, aggregation pipelines, and how to integrate MongoDB with your applications. Includes practical examples and best practices.', ARRAY['David Brown'], 6890, '50 min', 234, ARRAY['MongoDB', 'Database', 'NoSQL', 'Backend']),
('Tailwind CSS: Utility-First Styling', 'Learn how to build beautiful, responsive user interfaces using Tailwind CSS. This guide covers utility classes, responsive design, custom configurations, and component patterns. Transform your CSS workflow with this modern approach.', ARRAY['Emma Davis', 'Tom Rodriguez'], 9450, '40 min', 567, ARRAY['Tailwind CSS', 'CSS', 'Frontend', 'Design', 'Responsive']),
('Full-Stack Development with MERN Stack', 'Build complete web applications using MongoDB, Express.js, React.js, and Node.js. This comprehensive guide takes you through the entire development process from backend API creation to frontend implementation and deployment.', ARRAY['Lisa Garcia', 'Kevin Park', 'Rachel Kim'], 18750, '90 min', 1245, ARRAY['MERN', 'Full-Stack', 'React', 'Node.js', 'MongoDB', 'Advanced']);

-- Insert sample comments
INSERT INTO public.comments (guide_id, user_name, comment) 
SELECT id, 'CodeLearner123', 'Excellent tutorial! Really helped me understand React hooks.' 
FROM public.guides WHERE title = 'Complete React.js Tutorial for Beginners';

INSERT INTO public.comments (guide_id, user_name, comment) 
SELECT id, 'DevStudent', 'Great examples and clear explanations. Thank you!' 
FROM public.guides WHERE title = 'Complete React.js Tutorial for Beginners';

INSERT INTO public.comments (guide_id, user_name, comment) 
SELECT id, 'BackendDev', 'Comprehensive coverage of Express.js. Love the middleware explanations.' 
FROM public.guides WHERE title = 'Node.js API Development with Express';