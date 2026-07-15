import { groq } from "next-sanity";

export const allPostsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    tags,
    publishedAt,
    author->{ name, image }
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    tags,
    publishedAt,
    body,
    author->{ name, image, role }
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;