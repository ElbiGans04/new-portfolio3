"use client";
import { useEffect, useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  //   Default Value
  useEffect(() => {
    const isSystemWantDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const themeLocalstroage = window.localStorage.getItem("theme");
    setIsDarkMode(
      themeLocalstroage
        ? themeLocalstroage == "dark"
          ? true
          : false
        : isSystemWantDarkMode
    );
  }, [setIsDarkMode]);

  useEffect(() => {
    const selectElement = document.getElementsByTagName("html")[0];
    if (isDarkMode) {
      selectElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      selectElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <>
      {/* Dark Mode Toggle */}
      <label className="inline-flex items-center cursor-pointer">
        <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          <IoSunny size={20} />
        </span>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={(e) => setIsDarkMode(e.currentTarget.checked)}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          <IoMoon size={20} />
        </span>
      </label>
    </>
  );
}
