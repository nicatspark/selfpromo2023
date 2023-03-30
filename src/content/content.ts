import { z, defineCollection } from 'astro:content'
const articleCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date(),
    heroImage: z.string().optional(),
  }),
})
export const collections = {
  articles: articleCollection,
}
