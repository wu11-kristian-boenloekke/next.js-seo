import { BlogPostsResponse } from "@/model/BlogPost";
import { Metadata } from "next";
import Link from "next/link";
import { createSlug } from "@/utils/createSlug";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'This is a description of blog-posts',
}



export default async function BlogPage() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

  

  return (
    <div className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center mb-3 font-bold">Posts</h1>
      {posts.map(({ id, title }) => {
        const slug = createSlug(title);
        return (
          <article key={id}>
            <h2>
              <Link href={`/posts/${id}-${slug}`} className="text-lg font-bold">
                {title}
              </Link>
            </h2>
          </article>
        );
      })}
    </div>
  );
}