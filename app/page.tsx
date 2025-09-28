import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Rhafael Bijaksana",
};

export default async function Home() {
  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/blocks/27c30f0e6f0d805f9c03ddcb94b79072/children`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
      },
      cache: "force-cache",
    }
  );

  const data = (await requestData.json()) as {
    results: {
      paragraph: {
        rich_text: {
          plain_text: string;
        }[];
      };
    }[];
  };

  return (
    <>
      <h1 className="text-2xl lg:text-5xl">Hi Everyone !</h1>
      <div className="mt-10 gap-5 flex flex-col">
        {data.results.map((value, index) => {
          return (
            <p key={index} className="text-md lg:text-xl">
              {value.paragraph.rich_text.map((val) => val.plain_text).join(" ")}
            </p>
          );
        })}
      </div>
    </>
  );
}
