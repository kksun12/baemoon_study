# 🌴 여름 여행 with 친구들

친구들과 함께한 여름 여행의 소중한 순간들을 사진과 이야기로 남기는 웹사이트입니다.

## 🚀 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Supabase (Auth, Database)
- **Deployment**: Vercel (권장)

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. Authentication > Settings에서 이메일 확인 설정
3. 프로젝트 URL과 anon key를 환경 변수에 설정

### 4. 개발 서버 실행

```bash
npm run dev
```

## 🔐 인증 기능

- ✅ 회원가입 (이메일/비밀번호)
- ✅ 로그인/로그아웃
- ✅ 이메일 확인
- ✅ 사용자 프로필 관리

## 📝 게시판 기능

- ✅ 게시글 작성 (로그인 필요)
- ✅ 게시글 목록 보기
- ✅ 실시간 상태 관리
- ✅ 반응형 디자인

## 🎨 디자인 특징

- 🌊 여름 여행 테마
- ✨ 모던한 UI/UX
- 📱 반응형 디자인
- 🎭 애니메이션 효과

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── auth/           # 인증 페이지
│   ├── board/          # 게시판 페이지
│   └── layout.tsx      # 루트 레이아웃
├── components/         # React 컴포넌트
│   ├── Board.tsx       # 게시글 목록
│   ├── BoardForm.tsx   # 게시글 작성 폼
│   ├── SignIn.tsx      # 로그인 폼
│   └── SignUp.tsx      # 회원가입 폼
├── hooks/              # 커스텀 훅
│   └── useAuth.ts      # 인증 훅
├── lib/                # 유틸리티
│   └── supabase.ts     # Supabase 클라이언트
├── store/              # Zustand 스토어
│   ├── authStore.ts    # 인증 상태
│   └── boardStore.ts   # 게시판 상태
└── styles/             # 스타일
    └── globals.css     # 전역 스타일
```

## 🔧 추가 설정

### Supabase 데이터베이스 설정

게시글을 영구 저장하려면 Supabase에서 다음 테이블을 생성하세요:

```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS (Row Level Security) 설정
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 인증된 사용자만 읽기 가능
CREATE POLICY "Posts are viewable by everyone" ON posts
  FOR SELECT USING (true);

-- 인증된 사용자만 작성 가능
CREATE POLICY "Users can insert their own posts" ON posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);
```

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 연결
3. 환경 변수 설정
4. 자동 배포 완료!

## 📞 지원

문제가 있거나 개선 사항이 있다면 이슈를 생성해주세요!

---

**즐거운 여름 여행 되세요! 🌴☀️🌊**
