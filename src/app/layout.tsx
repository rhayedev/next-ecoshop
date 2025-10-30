import "@/app/styles/globals.css";
import Providers from './stores/Providers';
import QueryProvider from './stores/QueryProvider';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          <QueryProvider>
            {children}
          </QueryProvider>
        </Providers>
      </body>
    </html>
  );
}