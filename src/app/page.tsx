import Link from "next/link";

export default function Home() {
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

          {/* CTA 버튼들 */}
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
