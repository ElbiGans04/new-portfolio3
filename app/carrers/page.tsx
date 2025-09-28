import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Carrers | Rhafael Bijaksana",
};

export default async function CarrersPage(props: PageProps<"/carrers">) {
  const typeParams = (await props.searchParams).type as
    | "all"
    | "active"
    | undefined;

  const requestDataBody = JSON.stringify({
    filter: {
      property: "Gy_L",
      date: {
        is_empty: true,
      },
    },
  });

  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-80c1-8aea-000b72dbca55/query`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
        "Content-Type": "application/json"
      },
      cache: "force-cache",
      body: typeParams == "active" ? requestDataBody : undefined,
    }
  );

  const data = (await requestData.json()) as {
    results: {
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
    }[];
  };

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
        {data.results.map((value, index, initial) => {
          return (
            <React.Fragment key={value.id}>
              {/* Item */}
              <div className="flex flex-col gap-5">
                <div>
                  <h2 className="text-xl lg:text-2xl">
                    {value.properties["Company Name"].title[0].plain_text}
                  </h2>
                  <p className="lg:text-md">
                    {value.properties["Location"].rich_text[0].plain_text} |{" "}
                    {value.properties["Start Date"].date.start}{" "}
                    {value.properties["End Date"].date?.start
                      ? ` - ${value.properties["End Date"].date?.start}`
                      : " - Now"}
                    {}
                  </p>
                  <p className="text-md font-bold">
                    {value.properties.As.rich_text[0].plain_text}
                  </p>
                </div>
                <p className="text-md">
                  {value.properties.Description.rich_text[0].plain_text}
                </p>
              </div>

              {/* Divider */}
              {index !== initial.length - 1 && (
                <div className="w-[90%] mx-auto h-[1px] bg-[#0a0a0a] dark:bg-white opacity-[0.1]"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}
