import { BlogPostsResponse } from "@/model/BlogPost";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const response = await fetch("https://dummyjson.com/posts");
    const { posts }: BlogPostsResponse = await response.json();

    const postEntries: MetadataRoute.Sitemap = posts.map(({id}) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/${id}`,
        //Hvis vi havde et lastModified field af posts, kan det bruges her;
        // lastModified: new Date(post.updatedAt),

        //andre properties
        // changeFrequency:,
        // priority:
    }))

    return [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
            lastModified: new Date(),
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
        },

        ...postEntries

    ]
    

}