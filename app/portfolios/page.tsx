import { Metadata } from "next";
import Link from "next/link";
import LinkCustomPortfolios from "./_components/link";

export const metadata: Metadata = {
  title: "Portfolios | Rhafael Bijaksana",
};

export default function PortfoliosPage() {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">Portfolios</h1>
        <p>Below are some of the projects I have worked on.</p>
        <div className="flex flex-col gap-6">
          <div className="control flex gap-3 items-center gap-5">
            <p className="bg-white rounded p-2 text-black font-bold hover:opacity-[0.8] cursor-pointer">
              All
            </p>
            <p>Featured</p>
          </div>
          <div className="control flex gap-3 items-center gap-5">
            <p>All</p>
            <p className="bg-white rounded p-2 text-black font-bold hover:opacity-[0.8] cursor-pointer">
              Mobile App
            </p>
            <p>Website App</p>
          </div>
        </div>
      </div>
      <div className="mt-8 gap-5 grid lg:grid-cols-3">
        {Array(4)
          .fill(null)
          .map((value, index) => (
            <LinkCustomPortfolios href="/portfolios/1" key={index}>
              <div className="border-1 border-solid border-gray-700 p-5 rounded hover:cursor-pointer transition hover:bg-white hover:text-black hover:scale-[1.03]">
                <div className="head">
                  <p className="text-xl font-bold">CGS: Itradefund</p>
                </div>
                <div className="content mt-2">
                  <p className="text-md">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Esse, voluptatibus!
                  </p>
                </div>
                <div className="mt-8">
                  <div className="flex">
                    <p>Next Js</p>
                  </div>
                </div>
              </div>
            </LinkCustomPortfolios>
          ))}
      </div>
    </>
  );
}
