"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";

interface GalleryUploadProps {
  onUploadComplete: () => void;
}

export default function GalleryUpload({ onUploadComplete }: GalleryUploadProps) {
  const { user } = useAuth();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 이름이 있으면 이름, 없으면 이메일
    if (user) {
      setAuthor(user.user_metadata?.name || user.email || "");
    }
  }, [user]);

  // 파일 선택 처리
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    setImages(prev => [...prev, ...imageFiles]);

    // 미리보기 생성
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // 파일 제거
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  // 업로드 처리
  const handleUpload = async () => {
    if (!user || !author.trim() || !title.trim() || images.length === 0) return;

    setUploading(true);

    try {
      const imageUrls: string[] = [];

      // 각 이미지를 Supabase Storage에 업로드
      for (const image of images) {
        // 파일명을 안전한 형식으로 변환
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2);
        const fileExtension = image.name.split('.').pop() || 'jpg';
        const safeFileName = `${timestamp}-${randomString}.${fileExtension}`;
        
        const { data, error } = await supabase.storage
          .from('gallery-images')
          .upload(safeFileName, image);

        if (error) throw error;

        // 공개 URL 생성
        const { data: urlData } = supabase.storage
          .from('gallery-images')
          .getPublicUrl(safeFileName);

        imageUrls.push(urlData.publicUrl);
      }

      // 데이터베이스에 포스트 저장
      const { error: dbError } = await supabase
        .from('gallery_posts')
        .insert({
          user_id: user.id,
          author: author.trim(),
          title: title.trim(),
          description: description.trim(),
          images: imageUrls
        });

      if (dbError) throw dbError;

      // 폼 초기화
      setTitle("");
      setDescription("");
      setImages([]);
      setPreviews([]);
      
      // 부모 컴포넌트에 업로드 완료 알림
      onUploadComplete();

    } catch (error) {
      console.error('Upload error:', error);
      alert('업로드 중 오류가 발생했습니다.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-6">
      {/* 작성자 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">👤</span>
          작성자
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          value={author}
          disabled
          readOnly
        />
      </div>

      {/* 제목 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">📸</span>
          폴라로이드 제목 *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="폴라로이드 제목을 입력하세요"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
          required
        />
      </div>

      {/* 설명 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">✏️</span>
          사진 설명
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="사진에 대한 짧은 글귀를 적어보세요"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm min-h-[120px] resize-none"
        />
      </div>

      {/* 이미지 업로드 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <span className="mr-2">📷</span>
          사진 선택 * (여러 장 가능)
        </label>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors bg-white/50 backdrop-blur-sm"
        >
          <div className="text-center">
            <div className="text-3xl mb-2">📷</div>
            <div>클릭하여 사진을 선택하세요</div>
            <div className="text-sm mt-1">여러 장의 사진을 선택할 수 있습니다</div>
          </div>
        </button>
      </div>

      {/* 이미지 미리보기 */}
      {previews.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            선택된 사진 ({previews.length}장)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 업로드 버튼 */}
      <button
        type="submit"
        disabled={uploading || !author.trim() || !title.trim() || images.length === 0}
        className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {uploading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            업로드 중...
          </div>
        ) : (
          "📸 폴라로이드 업로드하기"
        )}
      </button>
    </form>
  );
} 