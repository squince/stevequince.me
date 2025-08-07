import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import steveImage from '../assets/steve.jpg';

export async function GET(context) {
	const posts = await getCollection('musings');
	const readyPosts = posts.filter((post) => post.data.postReady);
	const imageUrl = new URL(steveImage.src, context.site).href;
	
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: readyPosts.map((post) => {
			// Extract meaningful content preview from the post body
			const contentPreview = post.body
				.split('\n\n')
				.filter(paragraph => {
					// Skip headers and empty paragraphs
					return paragraph.trim() && 
						   !paragraph.trim().startsWith('#') && 
						   !paragraph.trim().startsWith('---');
				})
				.slice(0, 2) // Take first 2 meaningful paragraphs
				.join('\n\n')
				.replace(/^### .*$/gm, '') // Remove any remaining headers
				.replace(/^#+ .*$/gm, '') // Remove any other markdown headers
				.trim()
				.substring(0, 400); // Limit to 400 characters
			
			// Build the description with image and content
			let description = contentPreview;
			if (post.data.heroImage) {
				const imageUrl = new URL(post.data.heroImage.src, context.site).href;
				const imageAlt = post.data.imageAltText || post.data.description;
				description = `<img src="${imageUrl}" alt="${imageAlt}" style="max-width: 100%; height: auto; margin-bottom: 1em; border-radius: 8px;" /><br>${contentPreview}`;
			}
			
			return {
				title: post.data.title,
				description: description,
				pubDate: post.data.pubDate,
				updatedDate: post.data.updatedDate,
				link: `/musings/${post.id}/`,
			};
		}),
		customData: `<language>en-us</language><image><url>${imageUrl}</url><title>Steve Quince</title><link>${context.site.href}</link><width>200</width><height>200</height></image>`,
	});
}
