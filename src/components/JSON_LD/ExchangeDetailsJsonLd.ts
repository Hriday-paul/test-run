import { Add } from "@/redux/types"

export const gen_JsonLdExchangeDetails = (ad: Add, path: string) => {
    const exchange = ad?.exchange

    return {
        "@context": "https://schema.org",
        "@type": "Offer",                // ✅ Exchange = Offer type

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

        // ── Exchange Type ──────────────────────
        "businessFunction": "https://schema.org/LeaseOut", // ✅ Exchange/Swap

        // ── What I Have ────────────────────────
        ...(exchange?.exchange_category && {
            "itemOffered": {
                "@type": "Product",
                "name": ad.title,
                "category": exchange.exchange_category,  // "Car", "Bike" etc

                // ── Condition ──────────────────
                ...(exchange?.condition && {
                    "itemCondition": exchange.condition == "New"
                        ? "https://schema.org/NewCondition"
                        : "https://schema.org/UsedCondition"
                }),

                // ── Image ──────────────────────
                ...(ad.images?.length > 0 && {
                    "image": ad.images[0]?.url
                }),
            }
        }),

        // ── What I Want ────────────────────────
        ...(exchange?.wanted_category && {
            "acceptedPaymentMethod": {
                "@type": "PaymentMethod",
                "name": `Exchange with ${exchange.wanted_category}`, // "Exchange with Bike"
            },
            // ✅ Additional description of wanted item
            "description": `Looking to exchange for: ${exchange.wanted_category}`,
        }),

        // ── Availability ───────────────────────
        "availability": "https://schema.org/InStock",

        // ── Location ───────────────────────────
        "areaServed": {
            "@type": "PostalAddress",

            ...(exchange?.location && {
                "streetAddress": exchange.location,      // exchange specific location
            }),
            ...(ad?.area && {
                "streetAddress": ad.area.name,
            }),
            ...(ad?.district && {
                "addressLocality": ad.district.name,
            }),
            ...(ad?.division && {
                "addressRegion": ad.division.name,
            }),
            "addressCountry": "BD"
        },

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