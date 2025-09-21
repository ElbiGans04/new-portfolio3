import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveNavbar from "./_layouts/responsiveNavbar";
import "./globals.css";
import ButtonScrollToTop from "./_layouts/buttonScrollToTop";
import WrapperAppContext from "./_layouts/wrapperAppContext";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-white selection:text-black`}
      >
        <WrapperAppContext>
          <div className="w-full h-full min-h-screen max-h-screen lg:grid lg:grid-cols-4 relative">
            {/* List Of Page */}
            <ResponsiveNavbar>
              <>
                <div className="h-[1px] bg-white"></div>

                <div className="flex gap-5">
                  <div>ENGLISH</div>
                  <div>INDONESIA</div>
                </div>
              </>
            </ResponsiveNavbar>

            {/* Button Scroll To TOP */}
            <ButtonScrollToTop></ButtonScrollToTop>

            {/* Main Page */}
            <div className="col-span-3 lg:px-10 lg:py-24 py-12 px-8">
              <div className="">{children}</div>
              <footer className="mt-10">
                <p>
                  Copyright 2025{yearNow === 2025 ? "" : `-${yearNow}`} -
                  Rhafael Bijaksana
                </p>
              </footer>
            </div>
          </div>
        </WrapperAppContext>
      </body>
    </html>
  );
}
