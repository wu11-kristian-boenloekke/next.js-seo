
import Link from "next/link";
import { Corporation, PostalAddress, Person } from "schema-dts";
import { jsonLdScriptProps } from "react-schemaorg"
import Head from "next/head";
import { GraceHopper } from '@/jsonLd/GraceHopper'
import Script from "next/script";


export default function Home() {
  
  return (
    <>
   
      
      {/* <script 
      {...jsonLdScriptProps<Corporation>({
        "@context": "https://schema.org",
        "@type": "Corporation",
        name: "Next.js SEOTest",
        email: "email@example.com",
        telephone: '+45 12345678',
        address: {
          "@type": "PostalAddress",
          streetAddress: "Street 1",
          addressLocality: "Copenhagen",
          addressRegion: "Region",
          postalCode: "1234",
          addressCountry: "DK",
        } as PostalAddress, 
        url: "https://localhost:3000",
      })}
      /> */}
       {/* <Head>
      <script
        {...jsonLdScriptProps<Person>({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Grace Hopper",
          alternateName: "Grace Brewster Murray Hopper",
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: ["Yale University", "Vassar College"],
          },
          knowsAbout: ["Compilers", "Computer Science"],
        })}
      />
    </Head> */}

 {/* External Script - Loads an external script from a URL */}


      {/* Inline Script - Adds inline script to be executed on the client-side */}
      <Script
        id="inline-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              console.log('Inline script executed after interactive phase.');
            });
          `,
        }}
      />
   
    <main className="m-4">
      Home - Next metadata properties
      <div className="flex gap-1">
        <Link href="/about" className="text-blue-500">About</Link>
        - Overwrite title template med absolute
      </div>
      <div className="flex gap-1">
        <Link href="/posts" className="text-blue-500">Blog</Link>
        - Dynamisk metadata / generateMetadata() + statisk params rendering / generateStaticParams()
      </div>
      <div>
        <Link href={"/sitemap.xml"} className="text-blue-500">Dynamisk sitemap</Link>
      </div>
      <div>
        <Link href={"/robots.txt"} className="text-blue-500">robots.txt</Link>
      </div>
    </main>
    </>
  );
}
