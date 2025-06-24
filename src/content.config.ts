import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const musings = defineCollection({
	// Load Markdown and MDX files in the `src/content/musings/` directory.
	loader: glob({ base: './src/content/musings', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		postReady: z.boolean(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		heroText: z.string().optional(),
	}),
});

export const collections = { musings };
