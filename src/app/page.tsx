import { redirect } from 'next/navigation';

// Choisis ici ta locale par défaut
const DEFAULT_LOCALE = 'fr';

export default function RootRedirect() {
  redirect(`/${DEFAULT_LOCALE}`);
}
