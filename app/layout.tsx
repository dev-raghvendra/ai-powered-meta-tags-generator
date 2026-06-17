import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meta Tag Generator — AI-Powered SEO Tool",
  description:
    "Generate optimized meta tags for HTML, Next.js, Angular, Vue, React Helmet & Nuxt using Groq AI. Boost your SEO effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
