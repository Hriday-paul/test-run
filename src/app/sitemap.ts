import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://runbd.com',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://runbd.com/carbuysell',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.97,
        },
        {
            url: 'https://runbd.com/bikebuysell',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.95,
        },
        {
            url: 'https://runbd.com/login',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.90,
        },
        {
            url: 'https://runbd.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.85,
        },
        {
            url: 'https://runbd.com/vehicle-process',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://runbd.com/documents',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
        
    ]
}