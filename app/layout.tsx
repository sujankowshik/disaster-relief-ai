import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Disaster Relief Hub - AI-Powered Emergency Information",
  description:
    "Offline AI-powered emergency information system with comprehensive disaster relief procedures, first aid protocols, and emergency shelter guidance.",
  generator: "v0.app",
  manifest: "/manifest.json",
  keywords: ["disaster relief", "emergency", "first aid", "AI assistant", "offline", "survival", "safety"],
  authors: [{ name: "Disaster Relief Hub Team" }],
  creator: "v0.app",
  publisher: "Emergency Response Systems",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#dc2626",
  colorScheme: "light dark",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Relief Hub",
  },
  openGraph: {
    type: "website",
    title: "Disaster Relief Hub",
    description: "AI-powered offline emergency information system",
    siteName: "Disaster Relief Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Disaster Relief Hub",
    description: "AI-powered offline emergency information system",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
