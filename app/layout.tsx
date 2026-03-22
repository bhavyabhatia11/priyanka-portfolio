import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/layout/Sidebar"
import { getSiteConfig } from "@/lib/content"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Priyanka Datwani — Product Marketer & Content Strategist",
  description:
    "PMM and content strategist with a track record of launching ₹50L+ programs, growing audiences 3×, and building communities from scratch.",
  openGraph: {
    title: "Priyanka Datwani — Product Marketer & Content Strategist",
    description: "GTM strategy, content that converts, and communities that show up — across edtech, crowdfunding, F&B, and more.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const site = getSiteConfig()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ backgroundColor: "var(--color-bg)", color: "var(--color-fg)" }}
      >
        <div className="page-layout">
          <Sidebar site={site} />
          <main className="main-col">{children}</main>
        </div>
      </body>
    </html>
  )
}
