import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  description: "Rhafael Bijaksana Personal Website",
};

const yearNow = new Date().getFullYear();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="w-full h-full min-h-screen max-h-screen grid grid-cols-4">
          {/* List Of Page */}
          <div className="max-h-screen flex flex-col justify-center items-center pt-24 p-5 gap-[48px]">
            <div className="gap-[36px] flex flex-col ">
              {[
                { nameTitle: "About Me", path: "/" },
                { nameTitle: "Carrers", path: "/carrers" },
                { nameTitle: "Contacts", path: "/contacts" },
                { nameTitle: "Portfolios", path: "/portfolios" },
              ].map((value) => (
                <Link href={value.path} key={value.nameTitle} className="hover:underline font-bold">
                  {value.nameTitle}
                </Link>
              ))}
            </div>
            <div className="flex gap-5">
              <div>ENGLISH</div>
              <div>INDONESIA</div>
            </div>
          </div>
          {/* Main Page */}
          <div className="col-span-3 px-10 py-24">
            <div className="">{children}</div>
            <footer className="mt-10">
              <p>
                Copyright 2025{yearNow === 2025 ? "" : `-${yearNow}`} - Rhafael
                Bijaksana
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
