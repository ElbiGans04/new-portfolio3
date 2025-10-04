"use client";
import { usePathname } from "next/navigation";
import LinkCustomPortfolios from "./link";

export default function PortfoliosNavbarActive() {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-6">
      <div className="control flex gap-3 items-center gap-5">
        <LinkCustomPortfolios
          href="/portfolios"
          className={`border-1 border-white border-solid rounded p-2 ${
            pathName !== "/portfolios/featured"
              ? "bg-[#0a0a0a] text-[#ededed] dark:bg-white rounded p-2 dark:text-black font-bold hover:opacity-[0.8] cursor-pointer"
              : ""
          }`}
        >
          All
        </LinkCustomPortfolios>
        <LinkCustomPortfolios
          href="/portfolios/featured"
          className={`border-1 border-white border-solid rounded p-2 ${
            pathName == "/portfolios/featured"
              ? "bg-[#0a0a0a] text-[#ededed] dark:bg-white rounded p-2 dark:text-black font-bold hover:opacity-[0.8] cursor-pointer"
              : ""
          }`}
        >
          Featured
        </LinkCustomPortfolios>
      </div>
    </div>
  );
}
