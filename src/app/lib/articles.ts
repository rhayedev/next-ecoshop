export type Article = {
	slug: string;
	title: string;
	description: string;
	content: string;
};

const DB: Article[] = [
	{
		slug: 'keyboard-advices',
		title: 'Choix du clavier',
		description: 'Nous vous donnons nos conseils pour trouver le clavier qui vous correspond.',
		content: 'Nous vous donnons nos conseils pour trouver le clavier qui vous correspond.',
	},
	{
		slug: 'mouse-advices',
		title: 'Choix de la souris',
		description: 'Nous vous donnons nos conseils pour trouver la souris qui vous correspond.',
		content: 'Nous vous donnons nos conseils pour trouver la souris qui vous correspond.',
	},
];

export const Articles = {
	list: (): Article[] => DB,
	get: (slug: string): Article | undefined => DB.find((a) => a.slug === slug),
};