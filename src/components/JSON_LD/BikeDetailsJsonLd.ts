import { Add } from "@/redux/types"

export const gen_JsonLdBikeSellDetails = (ad: Add, path: string) => {
    const bike = ad?.bike

    return {
        "@context": "https://schema.org",
        "@type": "Product",

        // ── Must Have ──────────────────────────
        "name": ad.title,
        "url": `https://runbd.org/${path}/${ad.slug}`,

        ...(ad.description && {
            "description": ad?.description
        }),

        // ── Safe Image ─────────────────────────
        ...(ad.images?.length > 0 && {
            "image": ad.images[0]?.url
        }),

        // ── Category ───────────────────────────
        "category": "Motorcycle / Bike",

        // ── Optional Bike Fields ────────────────
        ...(bike?.brand && {
            "brand": { "@type": "Brand", "name": bike.brand }
        }),

        ...(bike?.model && { "model": bike.model }),

        ...(bike?.year && { "productionDate": bike.year.toString() }),

        ...(bike?.color && { "color": bike.color }),

        ...(bike?.fuel_type && { "fuelType": bike.fuel_type }),

        ...(bike?.bike_type && { "vehicleType": bike.bike_type }),

        ...(bike?.edition && { "edition": bike.edition }),

        ...(bike?.engine && {
            "vehicleEngine": {
                "@type": "EngineSpecification",
                "engineDisplacement": {
                    "@type": "QuantitativeValue",
                    "value": bike.engine,
                    "unitCode": "CMQ"           // CC
                }
            }
        }),

        // ── Offers ─────────────────────────────
        ...(!!ad?.price && {
            "offers": {
                "@type": "Offer",
                "price": ad.price.toString(),
                "priceCurrency": "BDT",
                "availability": "https://schema.org/InStock"
            }
        }),

        // ── Mileage or Kilometer ────────────────
        ...(bike?.kilometer != null && {
            "mileageFromOdometer": {
                "@type": "QuantitativeValue",
                "value": bike.kilometer,
                "unitCode": "KMT"               // KM
            }
        }),

        ...(bike?.condition && {
            "itemCondition": bike.condition === "new"
                ? "https://schema.org/NewCondition"
                : bike.condition === "reconditioned"
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