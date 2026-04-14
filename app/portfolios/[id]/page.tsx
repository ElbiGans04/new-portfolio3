import { Metadata } from "next";
import LinkCustomPortfolios from "@/app/portfolios/_components/link";
import NextImage from 'next/image'
import { notFound } from "next/navigation";
import PortfolioImage from "../_components/portfolioImage";

export const metadata: Metadata = {
  title: "Portfolios | Rhafael Bijaksana",
};

interface PortfolioItem {
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
      "Images"?: {
        rich_text: {
          plain_text: string
        }[]
      }
    };
  }[];
}

// Render halaman yang belum di generate oleh staticParams saat pertama kali request ( Sekali saja )
export const dynamicParams = true;
// Paksa halaman menjadi static 
export const dynamic = 'force-static';

export async function generateStaticParams() {
  const posts = (await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0/query`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
      },
      cache: "force-cache",
    }
  ).then((res) => res.json())) as PortfolioItem;

  return posts.results.map((post) => ({
    id: post.id,
  }));
}

export default async function PortfoliosPage(props: PageProps<'/portfolios/[id]'>) {
  const { id } = await props.params;
  const requestData = await fetch(
    `${process.env.NOTION_BASE_URL}/data_sources/27c30f0e-6f0d-81fc-bf7c-000b7d2f8bf0/query`,
    {
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.NOTION_KEY}`,
        "Notion-Version": `2025-09-03`,
      },
      cache: "force-cache",
    }
  );

  const data = (await requestData.json()) as PortfolioItem;
  const selectedData = data.results.find((value) => value.id === id);

  // Jika not found
  if (!selectedData) {
    return notFound()
  }

  /* 
    Images Filter. 
    Mengapa dibagi bedasarkan nomor urut ? karena saya menggunakan pembatas pada notion ketika 
    menyimpan url images terkait. Contoh : 
    "gambar1.com/abd
    @@@
    gambar2"
  */
  const images = selectedData?.properties.Images?.rich_text?.filter((v, i) => {
    if (i == 0) return true;
    return (i % 2) == 0 ? true : false;
  });
  
  const bodyText = selectedData?.properties.Description.rich_text[0].plain_text.split('\n').filter(val => val);

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
      <div className="mt-8 w-full h-full">
        <div className="gap-5 flex flex-col">
          {
            bodyText.map((val, index) => {
              return (
                <p key={index}>{val}</p>
              )
            })
          }

        </div>

        <div className="gap-[24px] w-full h-full relative flex flex-col mt-[36px] gap-[30px]">
          {
            images && images.map((val, index) => {
              return (<PortfolioImage key={`Portfolio-images-${index}`} val={val} />)
            })
          }
        </div>
      </div>
    </>
  );
}
