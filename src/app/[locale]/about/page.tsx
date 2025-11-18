export const metadata = {
	title: 'EcoShop — About',
	description: 'A propos de nous',
};

export default function AboutPage() {
	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold text-blue-600">À propos de nous</h2>
			<p>
				Bienvenue sur notre site ! Nous sommes une équipe passionnée par la vente de
				produits informatique. Nous vendons claviers, souris, écrans, etc...
			</p>
			<p>
				<em>Ce projet est développé avec un framework moderne basé sur
				React nommé "<strong>Next.js</strong>", permettant une expérience fluide et rapide.</em>
			</p>

			<div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
				<h3 className="font-semibold text-blue-700 mb-2">Notre savoir</h3>
				<p>Avec nos connaissances, nous pouvons vous fournir le matériel adapté.</p>
			</div>
		</div>
	);
}