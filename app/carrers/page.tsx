import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Carrers | Rhafael Bijaksana",
};

export default async function CarrersPage(props: PageProps<"/carrers">) {
  const typeParams = (await props.searchParams).type as string;

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">Carrers</h1>
        <div className="flex gap-4">
          {/* Selain active, maka tampilkan semua */}
          <Link
            href={"/carrers?type=all"}
            replace
            className={`cursor-pointer rounded-xl hover:opacity-[0.5] ${
              typeParams != "active" ? "underline font-bold" : ""
            }`}
          >
            All Jobs
          </Link>
          <Link
            href={"/carrers?type=active"}
            replace
            className={`cursor-pointer rounded-xl hover:opacity-[0.5] ${
              typeParams == "active" ? "underline font-bold" : ""
            }`}
          >
            Active Jobs
          </Link>
        </div>
      </div>
      <div className="mt-10 gap-16 flex flex-col">
        {/* Item */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl lg:text-2xl">PT. KANEZZA TECH</h2>
            <p className="lg:text-md">Tangerang | Nov, 2023 - Apr, 2024</p>
            <p className="text-md font-bold">Fullstack Developer</p>
          </div>
          <p className="text-md">
            As a Full Stack Engineer, I am responsible for end-to-end web
            development — from building modern frontends to managing backend
            services and server infrastructure. I also play a key role in
            bridging communication between IT vendors and clients, including
            attending on-site meetings to ensure alignment on technical and
            business requirements.
          </p>
        </div>

        {/* Divider */}
        <div className="w-[90%] mx-auto h-[1px] bg-white opacity-[0.1]"></div>

        {/* Item */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl lg:text-2xl">PT. INARRAY INDONESIA</h2>
            <p className="lg:text-md">Tangerang | Aug, 2022 - Okt, 2023</p>
            <p className="text-md font-bold">Frontend Developer</p>
          </div>
          <p className="text-md">
            As a Frontend Developer, I focus on developing user interfaces for
            internal tools and external client applications. My responsibilities
            include converting UI/UX designs into responsive web pages
            (slicing), integrating APIs, implementing business logic, and
            optimizing performance across various browsers and devices
          </p>
        </div>
      </div>
    </>
  );
}
