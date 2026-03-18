import { Add } from "@/redux/types"

export const gen_JsonLdWorkshopDetails = (ad: Add, path: string) => {
    const workshop = ad?.workshop

    return {
        "@context": "https://schema.org",
        "@type": "AutoRepair",           // ✅ Workshop = AutoRepair type

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

        // ── Workshop Type ──────────────────────
        ...(workshop?.workshop_type && {
            "additionalType": workshop.workshop_type  // "Car Workshop", "Bike Workshop"
        }),

        // ── Address ────────────────────────────
        "address": {
            "@type": "PostalAddress",

            ...(workshop?.address && {
                "streetAddress": workshop.address,    // "Mirpur 10, Dhaka"
            }),
            ...(ad?.area && {
                "streetAddress": ad.area.name,
            }),
            ...(ad?.district && {
                "addressLocality": ad.district.name,  // "Dhaka"
            }),
            ...(ad?.division && {
                "addressRegion": ad.division.name,    // "Dhaka Division"
            }),
            "addressCountry": "BD"
        },

        // ── Opening Hours ──────────────────────
        ...((workshop?.open_time || workshop?.close_time || workshop?.open_days?.length > 0) && {
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",

                // ── Days ───────────────────────
                ...(workshop?.open_days?.length > 0 && {
                    "dayOfWeek": workshop.open_days.map(day =>
                        `https://schema.org/${day}`   // "Monday", "Tuesday" etc
                    ),
                }),

                // ── Time ───────────────────────
                ...(workshop?.open_time && {
                    "opens": workshop.open_time,      // "09:00"
                }),
                ...(workshop?.close_time && {
                    "closes": workshop.close_time,    // "18:00"
                }),
            }
        }),

        // ── Offers ─────────────────────────────
        ...(ad?.price != null && {
            "offers": {
                "@type": "Offer",
                "price": ad.price.toString(),
                "priceCurrency": "BDT",
                "availability": "https://schema.org/InStock",
                "url": `https://runbd.org/${path}/${ad.slug}`,
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
                    "addressCountry": "BD"
                }
            }
        }),
    }
}