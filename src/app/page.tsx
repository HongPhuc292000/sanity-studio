import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Image from "next/image";
import { urlFor } from "@/util/sanity";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>

      <ul className="flex flex-col gap-y-6">
        {posts.map((post) => {
          const postImageUrl = post.image ? urlFor(post.image)?.url() : null;

          return (
            <li key={post._id}>
              <Link
                href={`/${post.slug.current}`}
                className="flex gap-4 items-start group"
              >
                {/* Thumbnail */}
                {postImageUrl && (
                  <div className="relative w-28 h-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={postImageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold group-hover:underline">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
    // <main className="container mx-auto min-h-screen max-w-3xl p-8">
    //   <h1 className="text-4xl font-bold mb-8">Posts</h1>
    //   <ul className="flex flex-col gap-y-4">
    //     {posts.map((post) => (
    //       <li className="hover:underline" key={post._id}>
    //         <Link href={`/${post.slug.current}`}>
    //           <h2 className="text-xl font-semibold">{post.title}</h2>
    //           <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </main>
  );
}
