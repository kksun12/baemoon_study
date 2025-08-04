"use client";

import { useEffect } from "react";

interface GalleryPost {
  id: string;
  user_id: string;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  author?: string;
}

interface ImageModalProps {
  post: GalleryPost;
  currentImageIndex: number;
  onClose: () => void;
  onImageChange: (index: number) => void;
}

export default function ImageModal({ 
  post, 
  currentImageIndex, 
  onClose, 
  onImageChange 
}: ImageModalProps) {
  const hasMultipleImages = post.images.length > 1;

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) {
            const prevIndex = currentImageIndex === 0 ? post.images.length - 1 : currentImageIndex - 1;
            onImageChange(prevIndex);
          }
          break;
        case 'ArrowRight':
          if (hasMultipleImages) {
            const nextIndex = currentImageIndex === post.images.length - 1 ? 0 : currentImageIndex + 1;
            onImageChange(nextIndex);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentImageIndex, hasMultipleImages, onClose, onImageChange, post.images.length]);

  // 이전 이미지로 이동
  const goToPreviousImage = () => {
    const prevIndex = currentImageIndex === 0 ? post.images.length - 1 : currentImageIndex - 1;
    onImageChange(prevIndex);
  };

  // 다음 이미지로 이동
  const goToNextImage = () => {
    const nextIndex = currentImageIndex === post.images.length - 1 ? 0 : currentImageIndex + 1;
    onImageChange(nextIndex);
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
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          ×
        </button>

        {/* 네비게이션 버튼들 */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors text-xl"
            >
              ‹
            </button>
            
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/70 transition-colors text-xl"
            >
              ›
            </button>
          </>
        )}

        {/* 이미지 */}
        <div className="relative">
          <img
            src={post.images[currentImageIndex]}
            alt={`${post.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
          
          {/* 이미지 인디케이터 */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentImageIndex + 1} / {post.images.length}
            </div>
          )}
        </div>

        {/* 정보 패널 */}
        <div className="p-6 bg-gray-50">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              {post.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {post.description}
                </p>
              )}
            </div>
          </div>

          {/* 메타 정보 */}
          <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
            <div className="flex items-center space-x-4">
              <span>📸 {post.author || '익명'}</span>
              <span>📅 {formatDate(post.created_at)}</span>
            </div>
            
            {/* 키보드 단축키 안내 */}
            <div className="text-xs text-gray-400">
              {hasMultipleImages && (
                <span>← → 키로 이미지 이동</span>
              )}
              <span className="ml-2">ESC로 닫기</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 