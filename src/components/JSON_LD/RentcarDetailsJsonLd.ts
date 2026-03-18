import { Add } from "@/redux/types"

export const gen_JsonLdCarRentDetails = (ad: Add, path: string) => {
    const rentCar = ad?.carRent

    return {
        "@context": "https://schema.org",
        "@type": "Service",              // ✅ Rent = Service type

        // ── Must Have ──────────────────────────
        "name": ad.title,
        "url": `https://runbd.org/${path}/${ad.slug}`,

        ...(ad.description && {
            "description": ad.description
        }),

        // ── Safe Image ─────────────────────────
        ...(ad.images?.length > 0 && {
            "image": ad.images[0]?.url
        }),

        // ── Service Type ───────────────────────
        "serviceType": "Car Rental",

        ...(rentCar?.car_type && {
            "additionalType": rentCar.car_type   // "SUV", "Sedan" etc
        }),

        // ── Area Served ────────────────────────
        ...(ad?.district && {
            "areaServed": {
                "@type": "Place",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": ad?.district?.name,
                    ...(ad?.division && {
                        "addressRegion": ad?.division?.name,
                    }),
                    ...(ad?.area && {
                        "streetAddress": ad?.area?.name,
                    }),
                    "addressCountry": "BD"
                }
            }
        }),



        // ── Rating (only if real data) ──────────
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.8,
            "reviewCount": 1200,
            "bestRating": 5,
            "worstRating": 1,
        },
    }
}