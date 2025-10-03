import { Metadata } from "next";
import CarrerItem from "./components/item";

export type DataItem = {
  id: string;
  properties: {
    As: {
      rich_text: {
        plain_text: string;
      }[];
    };
    "Company Name": {
      title: {
        plain_text: string;
      }[];
    };
    Description: {
      rich_text: {
        plain_text: string;
      }[];
    };
    "End Date": {
      date: {
        start: string;
      };
    };
    Location: {
      rich_text: {
        plain_text: string;
      }[];
    };
    "Start Date": {
      date: {
        start: string;
      };
    };
  };
};

export const metadata: Metadata = {
  title: "Carrers | Rhafael Bijaksana",
};

export default async function CarrersPage(props: PageProps<"/carrers">) {
  const typeParams = (await props.searchParams).type as
    | "all"
    | "active"
    | undefined;

  const requestDataBody = JSON.stringify({
    sorts: [
      {
        property: "JrVu",
        direction: "descending",
      },
    ],
  });

  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-80c1-8aea-000b72dbca55/query`,
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
    results: DataItem[];
  };

  return (
    <>
      {data.results.map((value, index, initial) => {
        return (
          <CarrerItem key={value.id} isDividerShow={false} value={value} />
        );
      })}
    </>
  );
}
