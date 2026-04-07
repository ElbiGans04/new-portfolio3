import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ResponsiveNavbar from "@/app/_layouts/responsiveNavbar";
import "./globals.css";
import ButtonScrollToTop from "@/app/_layouts/buttonScrollToTop";
import WrapperAppContext from "@/app/_layouts/wrapperAppContext";
import DarkModeToggle from "@/app/_layouts/darkmode";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:selection:bg-white dark:selection:text-black selection:bg-brand-dark selection:text-brand-text-dark dark:bg-brand-dark bg-white dark:text-brand-text-dark text-brand-text-light`}
      >
        <WrapperAppContext>
          <div className="w-full h-full min-h-screen relative dark:bg-brand-dark bg-white dark:text-brand-text-dark text-brand-text-light mt-[50px]">
            {/* List Of Page */}
            <ResponsiveNavbar>
              <>
                <div className="h-[1px]  bg-brand-dark  dark:bg-white"></div>

                {/* <div className="flex gap-5">
                  <div>ENGLISH</div>
                  <div>INDONESIA</div>
                </div> */}

                {/* Dark Mode Toggle */}
                <DarkModeToggle />
              </>
            </ResponsiveNavbar>

            {/* Button Scroll To TOP */}
            <ButtonScrollToTop></ButtonScrollToTop>

            {/* Main Page */}
            <div className="lg:max-w-4xl lg:mx-auto alg:px-30 lg:py-24 py-12 px-8 dark:bg-brand-dark bg-white dark:text-brand-text-dark text-brand-text-light">
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
