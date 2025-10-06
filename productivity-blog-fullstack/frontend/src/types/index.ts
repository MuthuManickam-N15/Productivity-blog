export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  image: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  readTime: string;
  content?: string;
  featured?: boolean;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface Newsletter {
  email: string;
  subscribedAt: string;
}