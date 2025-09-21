"use client";

import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ButtonScrollToTop() {
  const ref = useRef<HTMLButtonElement>(null);

  // useEffect
  useEffect(() => {
    function handler(e: Event) {
      const scrollY = window.scrollY;
      if (ref.current !== null) {
        if (scrollY > 100) {
          ref.current.setAttribute("data-visible", "show");
        } else {
          ref.current.removeAttribute("data-visible");
        }
      }
    }

    window.addEventListener("scroll", handler);

    return () => {
      window.removeEventListener("scroll", handler);
    };
  }, [ref]);

  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }}
      ref={ref}
      className="rounded-[50%] bg-white text-black data-visible:block hidden border-1 border-solid border-white p-3 fixed bottom-10 right-10 lg:right-20 hover:opacity-[0.8] active:opacity-[0.5] cursor-pointer"
    >
      <FaArrowUp size={20}></FaArrowUp>
    </button>
  );
}
