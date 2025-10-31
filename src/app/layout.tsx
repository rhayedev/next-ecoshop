import "@/app/styles/globals.css";
import Providers from './stores/Providers';
import QueryProvider from './stores/QueryProvider';
import RegisterSW from './components/RegisterSW';
import { ReactNode } from 'react';

if (process.env.NODE_ENV !== 'production') {
  import('../axe');
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3077C0" />
      </head>
      <body>
        <Providers>
          <QueryProvider>
            {children}
            {/* Enregistrement du Service Worker */}
            <RegisterSW />
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}