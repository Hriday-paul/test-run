import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import "./globals.css";
import Navbar from "@/shared/Navbar/Navbar";
import Footer from "@/shared/Footer/Footer";
import ReduxProvider from "@/shared/ReduxProvider";
import { Toaster } from 'sonner';
import NextJsTopLoader from "@/shared/NextJsTopLoader";
import TawkTo from "@/utils/TawkTo";

const poppins = Poppins({
  variable: "--font-poppin",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Runbd',
    default: 'Runbd',
  },
  description: "Runbd providing best Car Buy/Sell, Bike Buy/Sell, Car Rent, Workshops, Accessories, Exchange, Lawyer, Job & Services — All in One Click. Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.",

  keywords : ["runbd", "Runbd", "রানবিডি", "রান", "car", "buy", "sell", "rent", "car rent", "car sell", "car buy", "bike buy", "bike sell", "bike", "bikes", "job", "jobs", "exchange", "workshop", "accessories", "exchange", "lawyer", "bangladesh cars", "used car", "used bike", "new car", "new bike", "bangladesh bike", "bangladesh workshop", "bangladesh lawyer", "গাড়ি", "নতুন গাড়ি", "পুরাতন গাডি", "গাড়ি বিক্রয়", "গাড়ি বিক্রি", "গাড়ি ক্রয়", "গাড়ি ভাড়া", "বাইক বিক্রয়", "বাইক বিক্রি", "বাইক ক্রয়", "মটরসাইকেল", "মটরসাইকেল বিক্রি", "মটরসাইকেল ক্রয়", "চাকরি", "ওয়ার্কশপ", "গাড়ির সরঞ্জাম", "উকিল", "বাইসাইকেল", "এক্সচেঞ্জ"],

  metadataBase: new URL('https://runbd.org'),

  openGraph: {
    title: 'Runbd providing best Buy, Sell & Services — All in One Click',
    description: 'Runbd providing best Car Buy/Sell, Bike Buy/Sell, Car Rent, Workshops, Accessories, Exchange, Lawyer, Job & Services — All in One Click. Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.',
    url: 'https://runbd.org',
    siteName: 'Runbd',
    images: ["https://runbd.org/og-image.png"],
    locale: 'bn_BD',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Runbd providing best Buy, Sell & Services — All in One Click',
    description: 'Runbd providing best Car Buy/Sell, Bike Buy/Sell, Car Rent, Workshops, Accessories, Exchange, Lawyer, Job & Services — All in One Click. Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.',
    creator: '@runbd',
    images: ['https://runbd.org/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.png"
        />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>

      <TawkTo />

      <body
        className={`${poppins.variable} ${figtree.variable} antialiased`}
      >
        <ReduxProvider>
          <Toaster richColors position="top-right" />
          <NextJsTopLoader />
          <Navbar />
          <div className="">
            {children}
          </div>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
