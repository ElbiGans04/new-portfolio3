import React, { JSX } from "react";
import CarrersNavLink from "./components/carrersNavLink";

export default function CarrersLayout({ children }: LayoutProps<"/carrers">) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">Carrers</h1>
        <CarrersNavLink />
      </div>
      <div className="mt-10 gap-16 flex flex-col">{children}</div>
    </>
  );
}
