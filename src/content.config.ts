import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    body: z.string().optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string(),
    secondImage: z.string().optional(),
    body: z.string().optional(),
	pubDate: z.coerce.date().optional(),
	sourceUrl: z.string().optional(),
  }),
});

export const collections = {
  blog,
  projects,
};
