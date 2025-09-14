import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts | Rhafael Bijaksana",
};

export default async function ContactsPage() {

  return (
    <>
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl">Contacts</h1>
        <p>Interested in collaborating? Please contact me via email below.</p>
      </div>
      <div className="mt-8 gap-16 flex flex-col">
        <a className="underline hover:no-underline" href="mailto:rhafaelbijaksana04@gmail.com" target="_blank">rhafaelbijaksana04@gmai.com</a>
      </div>
    </>
  );
}
