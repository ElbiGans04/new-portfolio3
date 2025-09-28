import { Metadata } from "next";
import Link from "next/link";
import LinkCustomPortfolios from "../_components/link";

export const metadata: Metadata = {
  title: "Portfolios | Rhafael Bijaksana",
};

export default async function PortfoliosPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0/query`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
        // "Content-Type": "application/json",
      },
      cache: "force-cache",
      // body: typeParams == "active" ? requestDataBody : undefined,
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

  const selectedData = data.results.find((value) => value.id === id);

  return (
    <>
      <div className="flex gap-3 mb-6">
        <LinkCustomPortfolios
          className="underline hover:no-underline"
          href={"/portfolios"}
        >
          Portfolios
        </LinkCustomPortfolios>
        <p>/</p>
        <p>{selectedData?.properties["Project Title"].title[0].plain_text}</p>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">
          {selectedData?.properties["Project Title"].title[0].plain_text}
        </h1>
        <div className="flex flex-col gap-1">
          <p>
            <span className="font-bold">Technology Used</span> :{" "}
            {
              selectedData?.properties["Technology Used"].rich_text[0]
                .plain_text
            }
          </p>
          <p>
            <span className="font-bold">Url Project</span> :{" "}
            <a
              className="underline hover:no-underline"
              target="_blank"
              href={selectedData?.properties["Url Project"].url}
            >
              {" "}
              {selectedData?.properties["Url Project"].url}
            </a>
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p>{selectedData?.properties.Description.rich_text[0].plain_text}</p>
      </div>
    </>
  );
}
