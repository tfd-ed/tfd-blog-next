import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const commonSchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    date: z.union([z.string(), z.date()]).optional(),
    author: z.string().optional(),
    readTime: z.string().optional(),
    published: z.boolean().optional().default(false)
})

export default defineContentConfig({
    collections: {
        // English content collection
        content_en: defineCollection({
            type: 'page',
            source: {
                include: 'en/**',
                prefix: '',
            },
            schema: commonSchema,
        }),
        // Khmer content collection
        content_km: defineCollection({
            type: 'page',
            source: {
                include: 'km/**',
                prefix: '',
            },
            schema: commonSchema,
        }),
    },
})
