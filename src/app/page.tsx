"use client";

import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user, loading, signOut } = useAuth();

  // ✅ 로그아웃 함수
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">{/* ...생략된 데코레이션들 */}</div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* 제목 */}
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
              여름 여행
            </span>
            <br />
            <span className="text-4xl md:text-6xl">with 친구들</span>
          </h1>

          {/* 부제목 */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 font-light">
            🌴 함께 만드는 특별한 추억 🌴
          </p>

          {/* 설명 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20">
            <p className="text-lg text-white/95 leading-relaxed">
              친구들과 함께한 여름 여행의 소중한 순간들을
              <br />
              사진과 이야기로 남겨보세요
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/board">
              <div className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="text-gray-800 font-semibold text-lg">
                      게시판 가기
                    </span>
                    <span className="text-gray-600">✨</span>
                  </span>
                </button>
              </div>
            </Link>

            <Link href="/gallery">
              <div className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="text-gray-800 font-semibold text-lg">
                      갤러리로 이동
                    </span>
                    <span className="text-gray-600">📸</span>
                  </span>
                </button>
              </div>
            </Link>

            <a
              href="https://map.naver.com/p/search/%ED%97%A4%EC%9D%B4%EB%A6%AC%EC%95%A0%ED%8E%9C%EC%85%98"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="group relative inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <button className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600">
                  <span className="flex items-center space-x-2">
                    <span className="text-gray-800 font-semibold text-lg">
                      숙소 찾기
                    </span>
                    <span className="text-gray-600">🗺️</span>
                  </span>
                </button>
              </div>
            </a>

            {loading ? (
              // 로딩 중일 때 스켈레톤 버튼
              <div className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600 opacity-50">
                <span className="flex items-center space-x-2">
                  <span className="text-gray-800 font-semibold text-lg">
                    로딩 중...
                  </span>
                  <span className="text-gray-600">⏳</span>
                </span>
              </div>
            ) : user ? (
              // ✅ 로그인 상태일 때 로그아웃 버튼
              <button
                onClick={handleLogout}
                className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600 hover:bg-red-100 transition"
              >
                <span className="flex items-center space-x-2">
                  <span className="text-gray-800 font-semibold text-lg">
                    로그아웃
                  </span>
                  <span className="text-gray-600">🚪</span>
                </span>
              </button>
            ) : (
              // ✅ 비로그인 상태일 때 로그인/회원가입 버튼
              <Link href="/auth">
                <div className="group relative inline-block">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <button className="relative px-12 py-4 bg-white rounded-full leading-none flex items-center divide-x divide-gray-600">
                    <span className="flex items-center space-x-2">
                      <span className="text-gray-800 font-semibold text-lg">
                        로그인/회원가입
                      </span>
                      <span className="text-gray-600">🔑</span>
                    </span>
                  </button>
                </div>
              </Link>
            )}
          </div>

          {/* 하단 장식 */}
          <div className="mt-16 flex justify-center space-x-4 text-white/60">
            <span>🏖️</span>
            <span>🌊</span>
            <span>☀️</span>
            <span>🍹</span>
            <span>🎵</span>
          </div>
        </div>
      </div>
    </div>
  );
}
