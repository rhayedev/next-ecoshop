import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos — Next Shop',
  description: 'Page à propos',
};

export default function AboutPage() {
  return (
    <section>
      <h1>À propos</h1>
      <p>Cette application Next.js démontre routing, SEO, layouts, erreurs et i18n.</p>
    </section>
  );
}
