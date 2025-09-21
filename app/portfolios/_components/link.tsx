"use client";

import AppContext from "@/app/_contexts/appContext";
import Link from "next/link";
import { JSX, use } from "react";

export default function LinkCustomPortfolios({
  href,
  children,
  className,
}: {
  href: string;
  children: JSX.Element | string;
  className?: string;
}) {
  const { setLoading } = use(AppContext);

  return (
    <Link
      className={className}
      href={href}
      onClick={() => {
        if (setLoading) {
          setLoading(true);
        }
      }}
    >
      {children}
    </Link>
  );
}
