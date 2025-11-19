import newsData from '@/data/news.json';

export type News = {
	id: string;
	title: string;
	date: string;
	excerpt: string;
};

export const NewsAPI = {
	list: (): News[] => newsData,
	get: (id: string): News | undefined => newsData.find((n) => n.id === id),
};