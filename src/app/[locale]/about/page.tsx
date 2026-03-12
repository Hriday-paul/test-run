import Section1 from "@/components/About/Section1"
import Section2 from "@/components/About/Section2"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Runbd – Bangladesh's top-rated classified ads platform connecting buyers, sellers, and local businesses across the country.",

  metadataBase: new URL('https://runbd.org'),
  alternates: {
    canonical: '/about',
    languages: {
      en: '/about',
      bn: '/bn/about',
      'x-default': '/about'
    }
  },

  openGraph: {
    title: 'About Us | Runbd',
    description: "Learn about Runbd – Bangladesh's top-rated classified ads platform connecting buyers, sellers, and local businesses across the country.",
    url: '/about',
    siteName: 'Runbd',
    images: ['/og-image.png'],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    title: 'About Us | Runbd',
    description: "Learn about Runbd – Bangladesh's top-rated classified ads platform connecting buyers, sellers, and local businesses across the country.",
    card: 'summary_large_image',
    creator: '@runbd',
    images: ['/og-image.png'],
  },
}

function AboutPage() {
  return (
    <div className="">
      <Section1 />
      <Section2 />
    </div>
  )
}

export default AboutPage