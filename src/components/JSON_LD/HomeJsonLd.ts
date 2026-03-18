export const gen_JsonLdHomePage = () => {
    return [

        // ── 3. WebPage ─────────────────────────
        {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Runbd — Cars, Bikes, Jobs & Legal Services in Bangladesh",
            "url": "https://runbd.org",
            "description": "Find cars, bikes, rentals, workshops, jobs and lawyers in Bangladesh",
            "inLanguage": ["bn", "en"],
            "isPartOf": {
                "@type": "WebSite",
                "url": "https://runbd.org"
            },
            "about": {
                "@type": "Thing",
                "name": "Marketplace Bangladesh"
            },
            "breadcrumb": {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": "https://runbd.org"
                    }
                ]
            }
        },

        // ── 4. ItemList — Categories ───────────
        {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Browse Categories",
            "url": "https://runbd.org",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                        "@type": "Thing",
                        "name": "Cars for Sale",
                        "url": "https://runbd.org/carbuysell",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                        "@type": "Thing",
                        "name": "Bikes for Sale",
                        "url": "https://runbd.org/bikebuysell",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                        "@type": "Thing",
                        "name": "Car Rental",
                        "url": "https://runbd.org/car-rent",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "item": {
                        "@type": "Thing",
                        "name": "Workshops",
                        "url": "https://runbd.org/workshop",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "item": {
                        "@type": "Thing",
                        "name": "Jobs",
                        "url": "https://runbd.org/jobs",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 6,
                    "item": {
                        "@type": "Thing",
                        "name": "Lawyers",
                        "url": "https://runbd.org/lawyers",
                    }
                },
                {
                    "@type": "ListItem",
                    "position": 7,
                    "item": {
                        "@type": "Thing",
                        "name": "Exchange",
                        "url": "https://runbd.org/exchange",
                    }
                },
            ]
        },
    ]
}

export const gen_JsonLdGlobal = () => {
    return [

        // ── 1. WebSite ─────────────────────────
        {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Runbd",
            "url": "https://runbd.org",
            "description": "Bangladesh's trusted marketplace for cars, bikes, rentals, workshops, jobs and legal services",
        },

        // ── 2. Organization ────────────────────
        {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Runbd",
            "url": "https://runbd.org",
            "logo": {
                "@type": "ImageObject",
                "url": "https://runbd.org/logo.png",
                "width": 200,
                "height": 60
            },
            "sameAs": [
                "https://www.facebook.com/runbd24",
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Bengali", "English"],
                "areaServed": "BD",
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dhaka",
                "addressCountry": "BD"
            }
        },
    ]
}