"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CarrersNavLink() {
  const pathName = usePathname();
  return (
    <div className="flex gap-4">
      {/* Selain active, maka tampilkan semua */}
      <Link
        href={"/carrers"}
        replace
        className={`cursor-pointer rounded-xl hover:opacity-[0.5] ${
          pathName != "/carrers/active" ? "underline font-bold" : ""
        }`}
      >
        All Jobs
      </Link>
      <Link
        href={"/carrers/active"}
        replace
        className={`cursor-pointer rounded-xl hover:opacity-[0.5] ${
          pathName == "/carrers/active" ? "underline font-bold" : ""
        }`}
      >
        Active Jobs
      </Link>
    </div>
  );
}
