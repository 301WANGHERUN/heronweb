import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import ClientLayout from "./ClientLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "DevBlog",
    template: "%s | DevBlog",
  },
  description: "A developer's technical blog about web development, React, and TypeScript.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="DevBlog RSS" href="/rss.xml" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
