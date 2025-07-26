import "../styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "여름 여행 with 친구들 - 추억을 공유하세요",
  description:
    "친구들과 함께한 여름 여행의 소중한 순간들을 사진과 이야기로 남겨보세요",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
