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
  title: "Runbd",
  description: "Buy, Sell & Services — All in One Click. Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.",
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
