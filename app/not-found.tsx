import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Not Found | Rhafael Bijaksana",
};


export default function NotFoundPage () {
    return (
        <div className="flex flex-col gap-2 dark:bg-[#0a0a0a] bg-white dark:text-[#ededed] text-[#171717]">
            <h1 className="text-4xl">Sorry, </h1>
            <p className="text-xl">the page you are looking for was not found.</p>
        </div>
    )
}