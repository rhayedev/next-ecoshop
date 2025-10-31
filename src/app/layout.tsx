import type { ReactNode } from "react";
import "@/styles/globals.css";
import RegisterSW from './components/RegisterSW';
import AxeReporter from './components/AxeReporter'; 
import WebVitalsLogger from './components/WebVitalsLogger'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3077C0" />
      </head>
      <body>
        <WebVitalsLogger />
        {children}
        {process.env.NODE_ENV !== 'production' && <AxeReporter />}
        <RegisterSW />
      </body>
    </html>
  );
}