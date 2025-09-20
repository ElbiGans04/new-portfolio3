"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function toggleActiveAttribute(element: HTMLDivElement | null) {
  // kalau element ada
  if (element !== null) {
    const dataValue = element.getAttribute("data-active");
    if (dataValue == "show") {
      element.removeAttribute("data-active");
    } else {
      element.setAttribute("data-active", "show");
    }
  }
}

export default function ResponsiveNavbar({
  children,
}: {
  children: React.ReactElement;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const pathName = usePathname();
  const [loading, setLoading] = useState(false);

  // Special Hook Effect
  useEffect(() => {
    setLoading(false);
  }, [pathName, setLoading]);

  return (
    <>
      {/* ${isNavbarShowing ? 'max-md:top-0' : 'max-md:top-[-100%]'} */}
      <div
        ref={ref}
        className={`transition-all duration-[0.5s] fixed max-md:right-0 max-md:left-0 max-md:bottom-0 max-md:bg-black lg:relative  max-h-screen flex flex-col lg:justify-center lg:items-center pt-24 p-10 lg:p-5 gap-[48px] max-lg:data-active:top-0 max-lg:top-[-1000%]`}
      >
        <div className="lg:hidden">
          <button
            onClick={() => toggleActiveAttribute(ref.current)}
            className="p-3 border-white border-solid border-1 rounded-[50%] hover:opacity-[0.5]"
          >
            <IoMdClose size={28} />
          </button>
        </div>

        <div className="gap-[36px] flex flex-col ">
          {[
            { nameTitle: "About Me", path: "/" },
            { nameTitle: "Carrers", path: "/carrers" },
            { nameTitle: "Contacts", path: "/contacts" },
            { nameTitle: "Portfolios", path: "/portfolios" },
          ].map((value) => (
            <Link
              key={value.nameTitle}
              href={value.path}
              className="hover:underline font-bold"
              onClick={() => {
                toggleActiveAttribute(ref.current);

                if (pathName !== value.path) {
                  setLoading(true);
                }
              }}
            >
              {value.nameTitle}
            </Link>
          ))}
        </div>
        {children}
      </div>

      {/* Navbar When Small */}
      <div className="flex justify-between w-full  pb-0 px-8 py-12 lg:hidden items-center">
        <button
          disabled={loading}
          onClick={() => toggleActiveAttribute(ref.current)}
          className="p-3 border-white border-solid border-1 rounded-[50%] hover:opacity-[0.5] disabled:opacity-[0.5]"
        >
          <IoMenu size={28} />
        </button>

        {loading && (
          <AiOutlineLoading3Quarters size={28} className="animate-spin" />
        )}
      </div>
    </>
  );
}
