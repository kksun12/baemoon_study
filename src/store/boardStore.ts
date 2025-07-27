import { create } from "zustand";
import { supabase } from "../lib/supabase";

export type Post = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

type BoardState = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  addPost: (author: string, content: string) => Promise<void>;
};

export const useBoardStore = create<BoardState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("id, author, content, created_at")
      .order("created_at", { ascending: false });
    if (!error && data) {
      set({
        posts: data.map((row: any) => ({
          id: row.id,
          author: row.author,
          content: row.content,
          createdAt: row.created_at,
        })),
      });
    }
  },
  addPost: async (author, content) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ author: author, content }])
      .select();
    if (!error && data && data[0]) {
      set((state) => ({
        posts: [
          {
            id: data[0].id,
            author: data[0].author,
            content: data[0].content,
            createdAt: data[0].created_at,
          },
          ...state.posts,
        ],
      }));
    }
  },
}));
