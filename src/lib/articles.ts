import posts from '@/data/posts.json';

export type Article = {
	slug: string;
	title: string;
	html: string;
};

export const Articles = {
	list: (): Article[] => posts,
	get: (slug: string): Article | undefined => posts.find((p) => p.slug === slug),
};
