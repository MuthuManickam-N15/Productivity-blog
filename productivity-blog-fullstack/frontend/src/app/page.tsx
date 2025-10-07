import Hero from '@/components/home/Hero';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import RecentPosts from '@/components/home/RecentPosts';
import Newsletter from '@/components/home/Newsletter';
import { getAllPosts } from '@/lib/mdx';

export default async function HomePage() {
  const posts = await getAllPosts();
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 6);

  return (
    <>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
      <RecentPosts posts={recentPosts} />
      <Newsletter />
    </>
  );
}