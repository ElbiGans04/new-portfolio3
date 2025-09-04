import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Me | Rhafael Bijaksana',
}

export default function Home() {
  return (
    <>
      <h1 className="text-5xl">Hi Everyone !</h1>
      <div className="mt-10 gap-5 flex flex-col">
        <p className="text-xl">
          I'm a passionate Full Stack Developer with strong frontend focus,
          experienced in building modern, scalable web applications using
          Vue.js, Nuxt.js, React.js, and Next.js. I handle everything from UI
          implementation and API integration to performance optimization and SSR
          setup.
        </p>

        <p className="text-xl">
          I've also worked on server-side setup, including PostgreSQL databases,
          NGINX configuration, and domain/SSL deployment. As a freelancer, I've
          completed multiple projects from both local and international clients
          via Telegram, Facebook, Fiverr, and Upwork.
        </p>

        <p className="text-xl">
          In addition to development, I've served as a technical bridge between
          teams and clients, and provided IT support in my current company — a
          role that sharpened my communication and problem-solving skills.
        </p>
      </div>
    </>
  );
}
