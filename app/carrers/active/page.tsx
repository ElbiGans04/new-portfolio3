import React, { JSX } from "react";
import CarrerItem from "../_components/item";
import { DataItem } from "../page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrers | Rhafael Bijaksana",
};

export default async function CarrersActive() {
  const requestDataBody = JSON.stringify({
    filter: {
      property: "Gy_L",
      date: {
        is_empty: true,
      },
    },
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
          <CarrerItem key={value.id} isDividerShow={index !== (initial.length - 1)} value={value} />
        );
      })}
    </>
  );
}
