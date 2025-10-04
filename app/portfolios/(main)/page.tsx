import { Metadata } from "next";
import PortfolioItem from "../_components/portfolioItem";

export type TypeItemPortfolio = {
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
};

export const metadata: Metadata = {
  title: "Portfolios | Rhafael Bijaksana",
};

export default async function PortfoliosPage() {
  const requestDataBody = JSON.stringify({
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
    results: TypeItemPortfolio[];
  };

  return (
    <div className="mt-8 gap-5 grid lg:grid-cols-3">
      {data.results.map((value) => (
        <PortfolioItem key={value.id} value={value} />
      ))}
    </div>
  );
}
