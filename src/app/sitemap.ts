import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://runbd.org',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://runbd.org/carbuysell',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.97,
        },
        {
            url: 'https://runbd.org/bikebuysell',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.95,
        },
        {
            url: 'https://runbd.org/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.90,
        },
        {
            url: 'https://runbd.org/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.85,
        },
        {
            url: 'https://runbd.org/vehicle-process',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://runbd.org/documents',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        
    ]
}