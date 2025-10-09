export default function AboutLayout({ children }: { children: React.ReactNode }) {
	return (
		<section>
			<h2>A propos</h2>
			{children}
		</section>
	);
}