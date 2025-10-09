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
		description: 'Nous te donnons nos conseils pour trouver le clavier qui te correspond.',
		content: 'Nous te donnons nos conseils pour trouver le clavier qui te correspond.',
	},
	{
		slug: 'mouse-advices',
		title: 'Choix de la souris',
		description: 'Nous te donnons nos conseils pour trouver la souris qui te correspond.',
		content: 'Nous te donnons nos conseils pour trouver la souris qui te correspond.',
	},
];

export const Articles = {
	list: (): Article[] => DB,
	get: (slug: string): Article | undefined => DB.find((a) => a.slug === slug),
};
