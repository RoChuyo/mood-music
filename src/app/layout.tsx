import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "乐轴轴 - 心情音乐",
  description: "以音乐展开，记录每一刻心情",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#F0F5E8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="h-full flex items-center justify-center bg-[#1a1a2e]">
        <div
          id="phone-container"
          className="relative overflow-hidden bg-white"
          style={{
            width: 402,
            height: 874,
            borderRadius: 40,
            boxShadow: '0 0 0 8px #111, 0 0 0 10px #333, 0 25px 80px rgba(0,0,0,0.6)',
          }}
        >
          <div className="w-full h-full overflow-y-auto overflow-x-hidden relative" id="app-scroll">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
