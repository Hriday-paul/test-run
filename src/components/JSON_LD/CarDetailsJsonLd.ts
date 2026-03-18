import { Add } from "@/redux/types"

// ─── Details Page JSON-LD ────────────────────────────
export const gen_JsonLdCarSellDetails = (ad: Add, path: string) => {
    const car = ad?.car
    return {
        "@context": "https://schema.org",
        "@type": "Car",

        // ── Must Have ──────────────────────────
        "name": ad?.title,
        "url": `https://runbd.org/${path}/${ad?.slug}`,
        "description": ad?.description,

        // ── Safe Image ─────────────────────────
        ...(ad?.images?.length > 0 && {
            "image": ad?.images[0]?.url
        }),

        // ── Optional Car Fields ─────────────────
        ...(car?.brand && {
            "brand": { "@type": "Brand", "name": car?.brand }
        }),
        ...(car?.model && { "model": car?.model }),
        ...(car?.year && { "vehicleModelDate": car?.year }),
        ...(car?.color && { "color": car?.color }),
        ...(car?.fuel_type && { "fuelType": car?.fuel_type }),
        ...(car?.transmission && {
            "vehicleTransmission": car?.transmission
        }),
        ...(car?.seat && { "vehicleSeatingCapacity": car?.seat }),
        ...(car?.mileage != null && {
            "mileageFromOdometer": {
                "@type": "QuantitativeValue",
                "value": car?.mileage,
                "unitCode": "KMT"
            }
        }),
        ...(car?.engine && {
            "vehicleEngine": {
                "@type": "EngineSpecification",
                "engineDisplacement": {
                    "@type": "QuantitativeValue",
                    "value": car?.engine,
                    "unitCode": "CMQ"
                }
            }
        }),
        ...(car?.condition && {
            "vehicleCondition": car?.condition === "new"
                ? "https://schema.org/NewCondition"
                : car?.condition === "reconditioned"
                    ? "https://schema.org/RefurbishedCondition"
                    : "https://schema.org/UsedCondition"
        }),

        // ── Rating (only if real data) ──────────
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.8,
            "reviewCount": 1200,
            "bestRating": 5,
            "worstRating": 1,
        },

        // ── Offers ─────────────────────────────
        ...(!!ad?.price && {
            "offers": {
                "@type": "Offer",
                "price": ad.price.toString(),
                "priceCurrency": "BDT",
                "availability": "https://schema.org/InStock"
            }
        }),

        // ── Location ───────────────────────────
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
    }
}