import Providers from "@/providers";
import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import "./globals.css";

const inter = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Movify",
  description: "Lights, Stream, Action!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
     <Providers>{children}</Providers>
      </body>
    </html>
  );
}
