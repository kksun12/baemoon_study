"use client";
import { useState } from "react";
import { useBoardStore } from "../store/boardStore";

export default function BoardForm() {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addPost = useBoardStore((state) => state.addPost);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);

    // 실제로는 API 호출이 들어갈 자리
    setTimeout(() => {
      addPost(author, content);
      setContent("");
      setIsSubmitting(false);
    }, 500);
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
          <span className="mr-2">📖</span>
          여행 이야기
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
          rows={6}
          placeholder="친구들과 함께한 여름 여행의 특별한 순간을 이야기해주세요... 🌴☀️🌊"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={isSubmitting || !author.trim() || !content.trim()}
        className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
          isSubmitting
            ? "bg-gray-400"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            등록 중...
          </span>
        ) : (
          <span className="flex items-center justify-center">
            <span className="mr-2">✨</span>
            추억 등록하기
          </span>
        )}
      </button>

      {/* 힌트 */}
      <div className="text-xs text-gray-500 text-center bg-blue-50 rounded-lg p-3">
        💡 여행 장소, 특별했던 순간, 친구들과의 재미있는 에피소드를 자유롭게
        작성해보세요!
      </div>
    </form>
  );
}
