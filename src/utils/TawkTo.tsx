import Script from "next/script";

export default function TawkTo() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      src={`https://embed.tawk.to/${process.env.TAWKTO_KEY}`}
    />
  );
}
