import { z, defineCollection } from "astro:content";

const blogSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.string().optional(),
  heroImage: z.string().optional(),
  badge: z.string().optional(),
  tags: z.array(z.string()).refine(items => new Set(items).size === items.length, {
    message: 'tags must be unique',
  }).optional(),
});

const storeSchema = z.object({
  title: z.string(),
  description: z.string(),
  custom_link_label: z.string(),
  custom_link: z.string().optional(),
  updatedDate: z.coerce.date(),
  pricing: z.string().optional(),
  oldPricing: z.string().optional(),
  badge: z.string().optional(),
  checkoutUrl: z.string().optional(),
  heroImage: z.string().optional(),
});

const articleSchema = z.object({
  title: z.string(),
  description: z.string(),
  pubDate: z.string(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).optional(), // ✅ 追加
});

export type BlogSchema = z.infer<typeof blogSchema>;
export type StoreSchema = z.infer<typeof storeSchema>;
export type ArticleSchema = z.infer<typeof articleSchema>;

const blogCollection = defineCollection({ schema: blogSchema });
const storeCollection = defineCollection({ schema: storeSchema });
const articleCollection = defineCollection({ schema: articleSchema });

export const collections = {
  blog: blogCollection,
  store: storeCollection,
  articles: articleCollection,
};
