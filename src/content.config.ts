import { defineCollection, z } from 'astro:content';

// === Docs ===
const docs = defineCollection({
  schema: z.object({
    title: z.string(),                                
    description: z.string(),                          
    pubDate: z.coerce.date(),                          
    updatedDate: z.coerce.date().optional(),           
    heroImage: z.string().optional(),                  
    tags: z.array(z.string()).optional(),              
    draft: z.boolean().default(false).optional(),      
    body: z.string().optional(),                       
  }),
});

// === Projects ===
const projects = defineCollection({
  schema: z.object({
    title: z.string(),                                 
    description: z.string(),                           
    pubDate: z.coerce.date().optional(),               
    heroImage: z.string().optional(),                  
    projectType: z.enum(["Personal", "Team"]).default("Personal").optional(),
    platform: z.enum(["Mobile", "Website", "Other"]).default("Website").optional(),
    techStack: z.array(z.string()).optional(),
    liveUrl: z.string().url().optional(),
    sourceUrl: z.string().url().optional(),
    draft: z.boolean().default(false).optional(),
    body: z.string().optional(),
  }),
});

export const collections = {
  docs,
  projects,
};
