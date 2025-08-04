"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../lib/supabase";
import GalleryUpload from "../../components/GalleryUpload";
import PolaroidCard from "../../components/PolaroidCard";
import ImageModal from "../../components/ImageModal";
import Link from "next/link";

interface GalleryPost {
  id: string;
  user_id: string;
  title: string;
  description: string;
  images: string[];
  created_at: string;
  author?: string;
}

export default function Gallery() {
  const { user, signOut } = useAuth();
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<GalleryPost | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // 갤러리 포스트 불러오기
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // author가 저장되어 있으므로 그대로 사용
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // 포스트 삭제
  const handleDeletePost = async (postId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('gallery_posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // 삭제된 포스트를 상태에서 제거
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // 모달 열기
  const openModal = (post: GalleryPost, imageIndex: number = 0) => {
    setSelectedPost(post);
    setSelectedImageIndex(imageIndex);
    setShowModal(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setSelectedImageIndex(0);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold">📸 폴라로이드 갤러리</h1>
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
                    소중한 순간들을 폴라로이드로 남겨보세요 ✨
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 왼쪽: 사진 업로드 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="mr-2">📸</span>
                폴라로이드 업로드
              </h2>
              {user ? (
                <GalleryUpload onUploadComplete={fetchPosts} />
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    로그인이 필요합니다
                  </h3>
                  <p className="text-gray-500 mb-4">
                    폴라로이드를 업로드하려면 로그인해주세요.
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

          {/* 오른쪽: 갤러리 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🖼️</span>
                  폴라로이드 갤러리
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  여러분의 추억을 함께 공유해주세요 ✨
                </p>
              </div>
              
              {/* 갤러리 그리드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {posts.map((post) => (
                  <div key={post.id} className="flex justify-center">
                    <PolaroidCard
                      post={post}
                      currentUser={user}
                      onImageClick={(imageIndex) => openModal(post, imageIndex)}
                      onDelete={() => handleDeletePost(post.id)}
                    />
                  </div>
                ))}
              </div>

              {/* 포스트가 없을 때 */}
              {posts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📸</div>
                  <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    아직 등록된 폴라로이드가 없어요
                  </h3>
                  <p className="text-gray-500">
                    {user ? "첫 번째 폴라로이드를 업로드해보세요!" : "로그인하고 첫 번째 폴라로이드를 업로드해보세요!"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 이미지 모달 */}
      {showModal && selectedPost && (
        <ImageModal
          post={selectedPost}
          currentImageIndex={selectedImageIndex}
          onClose={closeModal}
          onImageChange={setSelectedImageIndex}
        />
      )}
    </div>
  );
} 