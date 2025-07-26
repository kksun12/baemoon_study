import { create } from "zustand";

type Post = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

type BoardState = {
  posts: Post[];
  addPost: (author: string, content: string) => void;
};

export const useBoardStore = create<BoardState>((set) => ({
  posts: [],
  addPost: (author, content) =>
    set((state) => ({
      posts: [
        ...state.posts,
        {
          id: Math.random().toString(36).substr(2, 9),
          author,
          content,
          createdAt: new Date().toISOString(),
        },
      ],
    })),
}));
