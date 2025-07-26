"use client";
import { useBoardStore } from "../store/boardStore";

export default function Board() {
  const posts = useBoardStore((state) => state.posts);

  const getRandomEmoji = () => {
    const emojis = ["🌴", "🌊", "☀️", "🏖️", "🍹", "🎵", "🌅", "🌙", "🏄‍♂️", "🚣‍♀️"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "방금 전";
    if (diffInHours < 24) return `${diffInHours}시간 전`;
    if (diffInHours < 48) return "어제";

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌴</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          아직 여행 이야기가 없어요
        </h3>
        <p className="text-gray-500">첫 번째 여행 추억을 남겨보세요!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
        >
          {/* 게시글 헤더 */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {post.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg">
                  {post.author}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatDate(post.createdAt)}
                </p>
              </div>
            </div>
            <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
              {getRandomEmoji()}
            </div>
          </div>

          {/* 게시글 내용 */}
          <div className="bg-white/60 rounded-xl p-4 mb-4 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* 게시글 푸터 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-colors">
                <span>❤️</span>
                <span>좋아요</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-colors">
                <span>💬</span>
                <span>댓글</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer transition-colors">
                <span>📤</span>
                <span>공유</span>
              </span>
            </div>
            <div className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
              여행 추억 #{index + 1}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
