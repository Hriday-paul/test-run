import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/user/', '/vendor/', "/profile/"],
    },
    sitemap: 'https://runbd.com/sitemap.xml',
  }
}