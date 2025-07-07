import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Guide {
  id: string;
  title: string;
  content: string;
  authors: string[];
  views: number;
  duration: string | null;
  likes: number;
  thumbnail: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  created_by: string | null;
  comments: Comment[];
}

export interface Comment {
  id: string;
  guide_id: string;
  user_name: string;
  comment: string;
  created_at: string;
  created_by: string | null;
}

export function useGuides() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchGuides = async (searchQuery?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('guides')
        .select(`
          *,
          comments (*)
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.ilike('title', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;

      setGuides(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGuide = async (guide: Omit<Guide, 'id' | 'created_at' | 'updated_at' | 'comments' | 'created_by'>, userId: string) => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .insert([{ ...guide, created_by: userId }])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guide created successfully!",
      });

      fetchGuides();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const updateGuide = async (id: string, updates: Partial<Guide>) => {
    try {
      const { data, error } = await supabase
        .from('guides')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guide updated successfully!",
      });

      fetchGuides();
      return { data, error: null };
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return { data: null, error };
    }
  };

  const deleteGuide = async (id: string) => {
    try {
      const { error } = await supabase
        .from('guides')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Guide deleted successfully!",
      });

      fetchGuides();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addComment = async (guideId: string, comment: string, userName: string, userId: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          guide_id: guideId,
          user_name: userName,
          comment,
          created_by: userId
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Comment added successfully!",
      });

      fetchGuides();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchGuides();
  }, []);

  return {
    guides,
    loading,
    fetchGuides,
    createGuide,
    updateGuide,
    deleteGuide,
    addComment,
  };
}