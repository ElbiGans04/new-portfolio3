import { TypeItemPortfolio } from "../(main)/page";
import LinkCustomPortfolios from "./link";

export default function PortfolioItem({ value }: { value: TypeItemPortfolio }) {
  return (
    <LinkCustomPortfolios href={`/portfolios/${value.id}`}>
      <div className="border-1 border-solid border-gray-700 p-5 rounded hover:cursor-pointer transition hover:bg-[#0a0a0a] dark:hover:bg-white hover:text-[#ededed] dark:hover:text-black hover:scale-[1.03]">
        <div className="head">
          <p className="text-xl font-bold">
            {value.properties["Project Title"].title[0].plain_text}
          </p>
        </div>
        <div className="content mt-2">
          <p className="text-md">
            {value.properties.Description.rich_text[0].plain_text.slice(0, 60)}
            ...
          </p>
        </div>
        <div className="mt-8">
          <div className="flex">
            <p>{value.properties["Technology Used"].rich_text[0].plain_text}</p>
          </div>
        </div>
      </div>
    </LinkCustomPortfolios>
  );
}
