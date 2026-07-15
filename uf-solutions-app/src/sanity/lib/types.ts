export interface SanityImageSource {
  asset: { _ref: string; _type: string };
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Author {
  name: string;
  image?: SanityImageSource;
  role?: string;
}

export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

export interface PostListItem {
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImageSource;
  tags?: string[];
  publishedAt: string;
  author?: Author;
}

export interface PostDetail extends PostListItem {
  body: PortableTextBlock[];
}