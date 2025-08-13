import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "@/components/layout/root-layout-client";
import { AppProvider } from "@/hooks/context";
// import AuthProvider from "./provider";
import { Header } from "@/components/landing/header";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: 'Renvoice – Voice AI Agents with SDK & Telephonic Interface',
    description:
        'Renvoice is an India-based Voice AI platform that helps you build smart voice agents using custom LLMs and agentic workflows like Zapier or n8n. Supports on-premise deployment for enterprises.',
    keywords: [
        'Voice AI India',
        'AI voice agents',
        'Zapier alternative',
        'n8n automation',
        'Telephonic AI SDK',
        'LLM voice bot',
        'Enterprise voice automation',
        'Voice workflow platform'
    ],
    openGraph: {
        title: 'Renvoice – Voice AI Agents with SDK and Automation Workflows',
        description:
            'Deploy custom voice agents powered by AI. Renvoice integrates with workflows like Zapier/n8n and supports SDK + telephony for enterprise automation.',
        url: 'https://renvoice.ai',
        siteName: 'Renvoice',
        images: [
            {
                url: 'https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/renvoice_logo.png',  // make sure this image exists
                width: 1200,
                height: 630,
                alt: 'Renvoice Voice AI Platform',
            },
        ],
        locale: 'en_IN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Renvoice – India’s Voice AI Platform with SDK and Telephony',
        description:
            'Build and integrate AI voice agents into phone systems. Automate workflows with Renvoice SDK + Zapier/n8n-style logic.',
        images: ['https://renambl.blr1.cdn.digitaloceanspaces.com/renvoice/web/renvoice_logo.png'],
    },
    alternates: {
        canonical: 'https://renvoice.ai',
    },
    icons: {
        icon: '/favicon.ico',
    },
    manifest: "/site.webmanifest"
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="overscroll-y-none overscroll-x-none">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased  flex flex-col overscroll-y-none overscroll-x-none`}
            >
                {/* <GlobalErrorBoundary> */}
                {/* <AuthProvider> */}
                <AppProvider>
                    <RootLayoutClient>{children}</RootLayoutClient>
                </AppProvider>
                {/* </AuthProvider> */}
                {/* </GlobalErrorBoundary> */}
            </body>
        </html>
    );
}