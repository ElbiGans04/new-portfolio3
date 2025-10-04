import PortfoliosNavbarActive from "../_components/navActive";

export default function PortfolioMainLayout({
  children,
}: LayoutProps<"/portfolios">) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl lg:text-5xl">Portfolios</h1>
        <p>Below are some of the projects I have worked on.</p>
        <PortfoliosNavbarActive />
      </div>
      {children}
    </>
  );
}
