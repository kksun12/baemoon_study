"use client";
import Board from "../../components/Board";
import BoardForm from "../../components/BoardForm";
import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

export default function BoardPage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 헤더 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <span className="text-2xl hover:text-yellow-300 transition-colors cursor-pointer">
                  🏠
                </span>
              </Link>
              <h1 className="text-3xl font-bold">🌴 여행 게시판</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm opacity-90">
                    안녕하세요, {user.user_metadata?.name || user.email}님! 👋
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <span className="text-sm opacity-90">
                    친구들과의 추억을 공유해보세요 ✨
                  </span>
                  <Link href="/auth">
                    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      로그인
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 게시글 작성 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">✍️</span>
                추억 남기기
              </h2>
              {user ? (
                <BoardForm />
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    로그인이 필요합니다
                  </h3>
                  <p className="text-gray-500 mb-4">
                    게시글을 작성하려면 로그인해주세요.
                  </p>
                  <Link href="/auth">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                      로그인하기
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* 오른쪽: 게시글 목록 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">📝</span>
                여행 이야기들
              </h2>
              <Board />
            </div>
          </div>
        </div>
      </div>

      {/* 하단 장식 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <p className="text-lg font-light">
            🌊 여름의 추억을 영원히 간직하세요 🌊
          </p>
        </div>
      </div>
    </div>
  );
}
