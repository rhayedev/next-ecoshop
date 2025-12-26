import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/global.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { NextIntlClientProvider } from "next-intl";
import { reportWebVitals } from '@/app/client/reportWebVitals';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Next Shop — Home",
    description: "Demo Next.js TS: routing, SEO, layouts, errors, i18n",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    if (typeof window !== 'undefined') reportWebVitals();
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#4f46e5" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192.png" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} p-5 bg-[#0c0c0c] max-w-screen overflow-x-hidden min-h-screen text-black antialiased`}
            >
                <NextIntlClientProvider>
                    <Header />
                    <main className="bg-[#533c3c] py-5 px-5 sm:px-40 h-full rounded-xl">
                        {children}
                    </main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
