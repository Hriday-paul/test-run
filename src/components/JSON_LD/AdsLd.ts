import { Add } from "@/redux/types"

export const gen_JsonLdAd = (ads: Add[], name: string, path: string) => {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": name,
        "url": `https://runbd.org/${path}`,
        "numberOfItems": ads.length,
        "itemListElement": ads.map((ad, index) => ({
            "@type": "ListItem",
            "position": index + 1,        // 1, 2, 3, 4...

            "item": {
                "@type": ad?.category,
                "name": ad?.title,
                "url": `https://runbd.org/${path}/${ad?.slug}`,

                // ✅ Safe image check
                ...(ad?.images?.length > 0 && {
                    "image": ad?.images[0]?.url
                }),

                // ✅ price 0 হলেও কাজ করবে
                ...(!!ad?.price && {
                    "offers": {
                        "@type": "Offer",
                        "price": ad?.price.toString(),
                        "priceCurrency": "BDT",
                        "availability": "https://schema.org/InStock",
                    }
                }),
            }

        })),
    }
}