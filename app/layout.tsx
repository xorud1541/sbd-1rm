import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import Script from "next/script";

const GA_ID = "G-Z8VPXN49YH";

// TODO: Supabase Auth 로그인 추가 위치

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://sbd-1rm.vercel.app";
const TITLE = "3대중량 1RM 계산기 | 스쿼트 벤치프레스 데드리프트 1RM 계산";
const DESCRIPTION =
  "스쿼트, 벤치프레스, 데드리프트 1RM을 계산하고 3대 합계, Wilks 점수, 체중 대비 등급을 확인하세요. 3대 몇이면 중급? 3대 등급표와 함께 내 실력을 확인해보세요.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | 3대중량 1RM 계산기",
  },
  description: DESCRIPTION,
  keywords: [
    "1RM 계산기",
    "3대 계산기",
    "3대중량 계산",
    "스쿼트 1RM 계산",
    "벤치프레스 1RM 계산",
    "데드리프트 1RM 계산",
    "3대 합 계산",
    "3대 몇이면 중급",
    "3대 등급표",
    "Wilks 점수 계산기",
    "체중 대비 3대",
    "파워리프팅 계산기",
  ],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "3대중량 1RM 계산기",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
