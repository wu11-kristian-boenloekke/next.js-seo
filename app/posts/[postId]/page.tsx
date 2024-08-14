import { BlogPost, BlogPostsResponse } from "@/model/BlogPost";
import { notFound } from "next/navigation";
import LikeButton from '@/components/LikeButton';
import type { WithContext, BlogPosting, BreadcrumbList } from "schema-dts";

import { createSlug } from "@/utils/createSlug";

interface BlogPostPageProps {
    params: { postId: string }
}

// Pre-generate static params
export async function generateStaticParams() {
    const response = await fetch("https://dummyjson.com/posts");
    const { posts }: BlogPostsResponse = await response.json();

    return posts.map(({ id, title }) => {
        const slug = createSlug(title);
        return { postId: `${id}-${slug}` };
    });
}

// Generate metadata dynamically based on postId (with slug)
export async function generateMetadata({ params: { postId } }: BlogPostPageProps) {
    const postIdNumber = postId.split('-')[0];  // Extract the ID part
    const response = await fetch(`https://dummyjson.com/posts/${postIdNumber}`);
    const post: BlogPost = await response.json();

    if (!response.ok) {
        return notFound();
    }

    return {
        title: post.title,
        description: post.body,
        openGraph: {
            title: post.title,
            description: post.body,
            images: [
                {
                    url: `https://next-js-seo-beige.vercel.app/api/og?title=${encodeURIComponent(post.title)}`,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.body,
        }
    };
}

// Main component to display the blog post
export default async function BlogPostPage({
    params: { postId },
}: BlogPostPageProps) {
    const postIdNumber = postId.split('-')[0];  // Extract the ID part
    const response = await fetch(`https://dummyjson.com/posts/${postIdNumber}`);
    const post: BlogPost = await response.json();

    if (!response.ok || !post) {
        return notFound();
    }

    const jsonLd: WithContext<BlogPosting> = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.body,
    };

    const breadCrumbList: WithContext<BreadcrumbList> = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${postId}`,
            },
        ],
    };

    return (
        <>
            
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbList) }}
                />
          

            <article className="max-w-prose m-auto space-y-5">
                <h1 className="text-3xl text-center font-bold">{post.title}</h1>
                <p className="text-lg">{post.body}</p>
                <LikeButton />
            </article>
        </>
    );
}



// import { BlogPost, BlogPostsResponse } from "@/model/BlogPost"
// import { notFound } from "next/navigation"
// import LikeButton from '@/components/LikeButton'
// import type { Article, WithContext, BlogPosting, BreadcrumbList } from "schema-dts"
// import Head from "next/head"

// interface BlogPostPageProps {
//     params: { postId: string }
// }

// //loading pages via params renderes de dynamisk - vi kan omgå dette ved at cache alle posts.id på forhånd så de bliver statisk renderet = SEO og loading optimering
// export async function generateStaticParams() {
//     const response = await fetch("https://dummyjson.com/posts")
//     const { posts }: BlogPostsResponse = await response.json()

//     return posts.map(({ id }) => id)
// }

// export async function generateMetadata({ params: { postId } }: BlogPostPageProps) {
//     const response = await fetch(`https://dummyjson.com/posts/${postId}`)
//     const post: BlogPost = await response.json()
    

//     return {
//         title: post.title,
//         description: post.body,
//         openGraph: {
//             title: post.title,
//             description: post.body,
//             //Hvis posts havde haft billeder, kunne og:image også genereres dynamisk
//             //nu dannes billede fra ImageResponse - api/og/ searchParams postId og title (encodeURIComponent for sikker omkodning af specialtegn i titel til URL string eks. '&' som '%26' )
//             images: [
//                 {
//                     url: `https://next-js-seo-beige.vercel.app/api/og?title=${encodeURIComponent(post.title)}`,
//                 }
//             ]

//         },
//         twitter: {
//             card: "summary_large_image",
//             title: post.title,
//             description: post.body,
//         }

        
//     }
// }

// //Next deduplicates automatisk den samme fetch request, så når der laves to requests til samme url vil den kun blive eksekveret en gang, og fetched data vil automatisk blive delt mellem metadata og UI
// //Det gælder kun med fetch(). Når vi bruger en database, eks. prisma, skal deduplication ske manuelt ved at cache request. 
// //   eks: const getPost = cache(async (postId: string) => {
// //     const post = await prisma.post.findUnique(postId)
// //     return post

// //   })


// export default async function BlogPostPage({
//     params: { postId },
// }: BlogPostPageProps) {
//     const response = await fetch(`https://dummyjson.com/posts/${postId}`)
//     const post: BlogPost = await response.json()

//     //naviger til not-found.tsx, istedet for tom side, som info til crawlers ved 404 status 
//     if (response.status === 404) {
//         notFound()
//     }
    

//     const jsonLd: WithContext<BlogPosting> = {
//         '@context': 'https://schema.org',
//         '@type': 'BlogPosting',
//         headline: post.title,
//         description: post.body,
//     }

//     const breadCrumbList: WithContext<BreadcrumbList> = {
//         '@context': 'https://schema.org',
//         '@type': 'BreadcrumbList',
//         itemListElement: [
//             {
//                 '@type': 'ListItem',
//                 position: 1,
//                 name: 'Home',
//                 item: `${process.env.NEXT_PUBLIC_BASE_URL}`,
//             },
//             {
//                 '@type': 'ListItem',
//                 position: 2,
//                 name: 'Blog',
//                 item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
//             },
//             {
//                 '@type': 'ListItem',
//                 position: 3,
//                 name: post.title,
//                 item: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${postId}`,
//             },
//         ],
//     }



//     return (
//         <>
//                 <script
//                     type="application/ld+json"
//                     dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//                 />
//                 <script
//                     type="application/ld+json"
//                     dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbList) }}
//                 />
            
           
//             <article className="max-w-prose m-auto space-y-5">
//                 <h1 className="text-3xl text-center font-bold">{post.title}</h1>
//                 <p className="text-lg">{post.body}</p>
//                 <LikeButton />
//             </article>
//         </>
//     )
// }


