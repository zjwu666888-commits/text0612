import "./globals.css";

export const metadata = {
  title: "虞见花园 · 沭阳七夕夜游会",
  description: "虞见花园沭阳七夕夜游会预约与产品介绍"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
