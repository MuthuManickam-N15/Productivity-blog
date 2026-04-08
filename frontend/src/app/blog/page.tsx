import BlogPageClient from './BlogPageClient';
import { getAllPosts, getAllCategories } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories(posts);

  return <BlogPageClient initialPosts={posts} categories={categories} />;
}