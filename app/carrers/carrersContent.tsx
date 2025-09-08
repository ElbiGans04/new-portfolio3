export default function CarrersContent() {
  return (
    <>
      {" "}
      <div className="flex flex-col gap-3">
        <h1 className="text-5xl">Carrers</h1>
        <div className="flex gap-4">
          <button className="cursor-pointer border-1 border-solid border-white p-3 rounded-xl hover:opacity-[0.5]">
            Show Text Detail
          </button>
          <button className="cursor-pointer border-1 border-solid border-white p-3 rounded-xl hover:opacity-[0.5]">
            All Jobs
          </button>
        </div>
      </div>
      <div className="mt-10 gap-16 flex flex-col">
        {/* Item */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl">PT. INARRAY INDONESIA</h2>
            <p className="text-md">Tangerang | Aug, 2022 - Okt, 2023</p>
            <p className="text-md font-bold">Frontend Developer</p>
          </div>
          <p className="text-md">
            I'm a passionate Full Stack Developer with strong frontend focus,
            experienced in building modern, scalable web applications using
            Vue.js, Nuxt.js, React.js, and Next.js. I handle everything from UI
            implementation and API integration to performance optimization and
            SSR setup.
          </p>
        </div>

        {/* Divider */}
        <div className="w-[90%] mx-auto h-[1px] bg-white opacity-[0.1]"></div>

        {/* Item */}
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-2xl">PT. INARRAY INDONESIA</h2>
            <p className="text-md">Tangerang | Aug, 2022 - Okt, 2023</p>
            <p className="text-md font-bold">Frontend Developer</p>
          </div>
          <p className="text-md">
            I'm a passionate Full Stack Developer with strong frontend focus,
            experienced in building modern, scalable web applications using
            Vue.js, Nuxt.js, React.js, and Next.js. I handle everything from UI
            implementation and API integration to performance optimization and
            SSR setup.
          </p>
        </div>
      </div>
    </>
  );
}
