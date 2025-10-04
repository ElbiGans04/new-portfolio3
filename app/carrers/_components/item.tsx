import React from "react";
import { DataItem } from "../page";
import moment from "moment";

export default function CarrerItem({
  value,
  isDividerShow,
}: {
  value: DataItem;
  isDividerShow: boolean;
}) {
  return (
    <>
      <React.Fragment>
        {/* Item */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-xl lg:text-2xl">
              {value.properties["Company Name"].title[0].plain_text}
            </h2>
            <p className="lg:text-md">
              {value.properties["Location"].rich_text[0].plain_text} |{" "}
              {moment(value.properties["Start Date"].date.start).format(
                "MMM D, YYYY"
              )}{" "}
              {value.properties["End Date"].date?.start
                ? ` - ${moment(value.properties["End Date"].date.start).format(
                    "MMM D, YYYY"
                  )}`
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
        {isDividerShow && (
          <div className="w-[90%] mx-auto h-[1px] bg-[#0a0a0a] dark:bg-white opacity-[0.1]"></div>
        )}
      </React.Fragment>
    </>
  );
}
