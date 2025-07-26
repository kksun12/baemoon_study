"use client";
import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SignUp({ onToggle }: { onToggle: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("회원가입이 완료되었습니다! 이메일을 확인해주세요.");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (error) {
      setMessage("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        <span className="mr-2">🌟</span>
        회원가입
      </h2>

      <form onSubmit={handleSignUp} className="space-y-6">
        {/* 이름 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="mr-2">👤</span>
            이름
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="당신의 이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* 이메일 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="mr-2">📧</span>
            이메일
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <span className="mr-2">🔒</span>
            비밀번호
          </label>
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="6자 이상 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        {/* 메시지 표시 */}
        {message && (
          <div
            className={`p-3 rounded-lg text-sm ${
              message.includes("완료")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        {/* 회원가입 버튼 */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
            loading
              ? "bg-gray-400"
              : "bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 shadow-lg hover:shadow-xl"
          }`}
        >
          {loading ? (
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
              가입 중...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <span className="mr-2">✨</span>
              회원가입
            </span>
          )}
        </button>

        {/* 로그인 링크 */}
        <div className="text-center">
          <button
            type="button"
            onClick={onToggle}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            이미 계정이 있으신가요? 로그인하기
          </button>
        </div>
      </form>
    </div>
  );
}
