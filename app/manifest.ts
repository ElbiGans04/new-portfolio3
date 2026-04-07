import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rhafael Bijaksana | Software Engineer',
    short_name: 'Rhafael Dev',
    description: 'Portfolio of Rhafael Bijaksana, a software developer specializing in modern web and mobile applications using JavaScript, React, Next.js, and Node.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#0a0a0a',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}