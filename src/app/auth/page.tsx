"use client";
import { useState } from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Link from "next/link";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative overflow-hidden">
      {/* 배경 장식 요소들 */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-green-300 rounded-full opacity-25 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/3 w-14 h-14 bg-orange-300 rounded-full opacity-20 animate-pulse"></div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* 홈 링크 */}
          <div className="text-center mb-8">
            <Link href="/">
              <button className="text-white hover:text-yellow-300 transition-colors text-2xl">
                🏠
              </button>
            </Link>
          </div>

          {/* 인증 폼 */}
          {isSignIn ? (
            <SignIn onToggle={() => setIsSignIn(false)} />
          ) : (
            <SignUp onToggle={() => setIsSignIn(true)} />
          )}

          {/* 하단 장식 */}
          <div className="mt-8 text-center text-white/60">
            <p className="text-sm">
              🌴 여름 여행의 추억을 함께 만들어보세요 🌴
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
