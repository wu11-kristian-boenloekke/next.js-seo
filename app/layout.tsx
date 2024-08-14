import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {


  title: {
    default: 'Next.js SEO Test',
    template: '%s - Next.js SEO Test'
  },
  description: 'This is a description of next.js SEO test site',
  robots: 'index, follow',

  twitter: {
    card: 'summary_large_image',
  },

  openGraph: {
    title: 'Nex.js SEO Test',
    description: 'This is a description of the site for social media',
    type: 'website',
    url: 'https://7ezih33v5asnwc4eymklp7tfr4.srv.us/',
    images: [
      {
        url: 'localhost:3000/api/og/1200x630',
        width: 1200,
        height: 630,
        alt: ' OG Image',
      },
    ],
    siteName: 'Next.jsSEOTest',
    locale: 'en_US',
  },

  // https://developer.x.com/en/docs/twitter-for-websites/cards/overview/markup

  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@nextjsseotest',
  //   title: 'Next.js SEO Test',
  //   description: 'This is a description of the site for Twitter',
  //   images: [
  //     {
  //       url: 'https://localhost:3000/twitter-image.jpg',
  //       alt: 'Twitter Image',
  //     },
  //   ],
  //   creator: '@creatorHandle',
  //    
  // },

  alternates: {
    canonical: 'https://www.next.js-seo-test.com',
    languages: {
      'da-DK': 'https://www.next.js-seo-test.com',
      'en-US': 'https://www.next.js-seo-test.com/en',
    },
  },

}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://my-company.com",
  logo: "/logos/logo.webp",
  name: "My Company Name",
  legalName: "My Company Name Limited",
  telephone: "+447777777777",
  sameAs: ["https://www.linkedin.com/company/company-name/"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          key="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link crossOrigin=""  rel="preconnect" href="https://instant.page" />
      </head>
      <body className={inter.className}>
        <header className="p-4 border-black border-b mb-4">
          <Link href={"/"} className="text-xl font-bold">Next.js SEO test</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
