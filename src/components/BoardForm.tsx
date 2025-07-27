"use client";
import { useState } from "react";
import { useBoardStore } from "../store/boardStore";

export default function BoardForm() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addPost = useBoardStore((state) => state.addPost);
  const fetchPosts = useBoardStore((state) => state.fetchPosts);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    await addPost(author, content);
    setAuthor("");
    setContent("");
    await fetchPosts();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 작성자 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">👤</span>
          작성자
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          placeholder="당신의 이름을 입력하세요"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">✏️</span>
          여행 이야기
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm min-h-[120px]"
          placeholder="여행의 추억을 남겨보세요!"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isSubmitting ? "등록 중..." : "추억 등록하기"}
      </button>
    </form>
  );
}
