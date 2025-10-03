import { Metadata } from "next";
import LinkCustomPortfolios from "./_components/link";

export const metadata: Metadata = {
  title: "Portfolios | Rhafael Bijaksana",
};

export default async function PortfoliosPage(props: PageProps<"/portfolios">) {
  const typeParams = (await props.searchParams).active as
    | "all"
    | "featured"
    | undefined;

  const requestDataBody = JSON.stringify({
    filter:
      typeParams == "featured"
        ? {
            property: "fxRp",
            checkbox: {
              equals: true,
            },
          }
        : undefined,
    sorts: [
      {
        property: "title",
        direction: "ascending",
      },
    ],
  });

  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0/query`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
        "Content-Type": "application/json",
      },
      cache: "force-cache",
      body: requestDataBody,
    }
  );

  const data = (await requestData.json()) as {
    results: {
      id: string;
      properties: {
        Featured: {
          checkbox: boolean;
        };
        "Project Title": {
          title: {
            plain_text: string;
          }[];
        };
        Description: {
          rich_text: {
            plain_text: string;
          }[];
        };
        "Technology Used": {
          rich_text: {
            plain_text: string;
          }[];
        };
        "Url Project": {
          url: string;
        };
      };
    }[];
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">Portfolios</h1>
        <p>Below are some of the projects I have worked on.</p>
        <div className="flex flex-col gap-6">
          <div className="control flex gap-3 items-center gap-5">
            <LinkCustomPortfolios
              href="/portfolios"
              className={`border-1 border-white border-solid rounded p-2 ${
                typeParams !== "featured"
                  ? "bg-[#0a0a0a] text-[#ededed] dark:bg-white rounded p-2 dark:text-black font-bold hover:opacity-[0.8] cursor-pointer"
                  : ""
              }`}
            >
              All
            </LinkCustomPortfolios>
            <LinkCustomPortfolios
              href="/portfolios?active=featured"
              className={`border-1 border-white border-solid rounded p-2 ${
                typeParams == "featured"
                  ? "bg-[#0a0a0a] text-[#ededed] dark:bg-white rounded p-2 dark:text-black font-bold hover:opacity-[0.8] cursor-pointer"
                  : ""
              }`}
            >
              Featured
            </LinkCustomPortfolios>
          </div>
        </div>
      </div>
      <div className="mt-8 gap-5 grid lg:grid-cols-3">
        {data.results.map((value) => (
          <LinkCustomPortfolios href={`/portfolios/${value.id}`} key={value.id}>
            <div className="border-1 border-solid border-gray-700 p-5 rounded hover:cursor-pointer transition hover:bg-[#0a0a0a] dark:hover:bg-white hover:text-[#ededed] dark:hover:text-black hover:scale-[1.03]">
              <div className="head">
                <p className="text-xl font-bold">
                  {value.properties["Project Title"].title[0].plain_text}
                </p>
              </div>
              <div className="content mt-2">
                <p className="text-md">
                  {value.properties.Description.rich_text[0].plain_text.slice(
                    0,
                    60
                  )}
                  ...
                </p>
              </div>
              <div className="mt-8">
                <div className="flex">
                  <p>
                    {
                      value.properties["Technology Used"].rich_text[0]
                        .plain_text
                    }
                  </p>
                </div>
              </div>
            </div>
          </LinkCustomPortfolios>
        ))}
      </div>
    </>
  );
}
