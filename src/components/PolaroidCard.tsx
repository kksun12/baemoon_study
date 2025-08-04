"use client";

import { useState } from "react";
import { User } from "@supabase/supabase-js";

interface GalleryPost {
  id: string;
  user_id: string;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  author?: string;
}

interface PolaroidCardProps {
  post: GalleryPost;
  currentUser: User | null;
  onImageClick: (imageIndex: number) => void;
  onDelete: () => void;
}

export default function PolaroidCard({ 
  post, 
  currentUser, 
  onImageClick, 
  onDelete 
}: PolaroidCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isOwner = currentUser?.id === post.user_id;
  const hasMultipleImages = post.images.length > 1;

  // 압정 색상 배열 (컬러풀한 플라스틱 압정)
  const pinColors = [
    'from-pink-400 to-pink-600',      // 핑크
    'from-blue-400 to-blue-600',      // 파랑
    'from-green-400 to-green-600',    // 초록
    'from-yellow-400 to-yellow-600',  // 노랑
    'from-purple-400 to-purple-600',  // 보라
    'from-red-400 to-red-600',        // 빨강
    'from-indigo-400 to-indigo-600',  // 인디고
    'from-teal-400 to-teal-600',      // 틸
  ];

  // 압정 색상 선택 (여러 방법 중 하나 선택)
  // 방법 1: 포스트 ID의 첫 번째 문자 기반
  const colorIndex1 = post.id.charCodeAt(0) % pinColors.length;
  
  // 방법 2: 포스트 ID의 마지막 문자 기반
  const colorIndex2 = post.id.charCodeAt(post.id.length - 1) % pinColors.length;
  
  // 방법 3: 포스트 ID의 모든 문자 합계 기반
  const colorIndex3 = post.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % pinColors.length;
  
  // 방법 4: 생성 시간 기반 (created_at 사용)
  const colorIndex4 = new Date(post.created_at).getTime() % pinColors.length;
  
  // 현재 사용할 방법 선택 (방법 3이 가장 다양함)
  const colorIndex = colorIndex3;
  const selectedColor = pinColors[colorIndex];
  
  // 디버깅용 콘솔 출력 (개발 중에만 사용)
  console.log(`Post ID: ${post.id}, Color Index: ${colorIndex}, Selected Color: ${selectedColor}`);

  // 이전 이미지로 이동
  const goToPreviousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? post.images.length - 1 : prev - 1
    );
  };

  // 다음 이미지로 이동
  const goToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === post.images.length - 1 ? 0 : prev + 1
    );
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="group relative">
      {/* 컬러 플라스틱 압정 */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center transform rotate-3 hover:rotate-6 transition-transform duration-300">
          {/* 압정 머리 (둥근 부분) */}
          <div className={`w-6 h-6 bg-gradient-to-br ${selectedColor} rounded-full shadow-lg border-2 border-white relative transform -rotate-2`}>
            {/* 압정 하이라이트 */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-white/60 rounded-full"></div>
            {/* 압정 반사광 */}
            <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
          
          {/* 압정 바늘 (뾰족한 부분) */}
          <div className="w-1 h-4 bg-gradient-to-b from-gray-300 to-gray-500 shadow-md relative transform rotate-1">
            {/* 바늘 끝부분 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[2px] border-r-[2px] border-b-[4px] border-l-transparent border-r-transparent border-b-gray-600"></div>
          </div>
        </div>
        
        {/* 압정 그림자 - 기울어진 그림자 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-black/20 rounded-full blur-sm transform rotate-3"></div>
      </div>

      {/* 폴라로이드 카드 */}
      <div 
        className="bg-white rounded-lg shadow-xl p-4 transform rotate-1 hover:rotate-0 transition-all duration-300 cursor-pointer border border-gray-200 relative"
        onClick={() => onImageClick(currentImageIndex)}
        style={{
          boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 10px rgba(0,0,0,0.05)'
        }}
      >
        {/* 폴라로이드 테두리 효과 */}
        <div className="absolute inset-0 rounded-lg border-2 border-gray-100 pointer-events-none"></div>
        
        {/* 이미지 컨테이너 */}
        <div className="relative mb-4">
          <img
            src={post.images[currentImageIndex]}
            alt={post.title}
            className="w-full h-64 object-cover rounded"
          />
          
          {/* 네비게이션 버튼들 */}
          {hasMultipleImages && (
            <>
              {/* 이전 버튼 */}
              <button
                onClick={goToPreviousImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20"
              >
                <span className="text-lg font-bold">‹</span>
              </button>
              
              {/* 다음 버튼 */}
              <button
                onClick={goToNextImage}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all duration-200 backdrop-blur-sm shadow-lg border border-white/20"
              >
                <span className="text-lg font-bold">›</span>
              </button>
              
              {/* 이미지 인디케이터 */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-lg border border-white/20">
                {currentImageIndex + 1} / {post.images.length}
              </div>
            </>
          )}
        </div>

        {/* 제목 */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          {post.title}
        </h3>

        {/* 설명 */}
        {post.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.description}
          </p>
        )}

        {/* 메타 정보 */}
        <div className="text-xs text-gray-500 space-y-1">
          <div>📸 {post.author || '익명'}</div>
          <div>📅 {formatDate(post.created_at)}</div>
        </div>

        {/* 폴라로이드 하단 그림자 효과 */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-gray-200 to-transparent rounded-b-lg pointer-events-none"></div>
      </div>

      {/* 삭제 버튼 (소유자만 표시) */}
      {isOwner && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm('정말로 이 폴라로이드를 삭제하시겠습니까?')) {
              onDelete();
            }
          }}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 shadow-lg"
          title="삭제"
        >
          ×
        </button>
      )}

      {/* 여러 이미지 표시기 */}
      {hasMultipleImages && (
        <div className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-lg">
          {post.images.length}
        </div>
      )}

      {/* 카드 그림자 효과 */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-200/20 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
} 