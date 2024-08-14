import { BlogPostsResponse } from "@/model/BlogPost";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Blog',
    description: 'This is a description of blog-posts',
}

export default async function BlogPage() {
  const response = await fetch("https://dummyjson.com/posts");
  const { posts }: BlogPostsResponse = await response.json();

//   await delay(1000);

  return (
    <div className="max-w-prose m-auto space-y-5">
      <h1 className="text-3xl text-center mb-3 font-bold">Posts</h1>
      {posts.map(({ id, title }) => (
        <article key={title}>
          <h2>
            <Link  href={`/posts/${encodeURIComponent(title)}`} className="text-lg font-bold">
              {title}
            </Link>
          </h2>
        </article>
      ))}
    </div>
  );
}