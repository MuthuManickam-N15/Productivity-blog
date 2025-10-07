import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PostHeader from '@/components/post/PostHeader';
import PostContent from '@/components/post/PostContent';
import TableOfContents from '@/components/post/TableOfContents';
import ShareButtons from '@/components/post/ShareButtons';
import RelatedPosts from '@/components/post/RelatedPosts';
import CommentSection from '@/components/post/CommentSection';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  return (
    <article className="pt-24 pb-20">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <PostHeader post={post} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PostContent content={post.content || ''} />

              {/* Share Buttons */}
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <ShareButtons title={post.title} url={postUrl} />
              </div>

              {/* Comments */}
              <CommentSection postSlug={post.slug} />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <TableOfContents />
            </aside>
          </div>

          {/* Related Posts */}
          <RelatedPosts posts={relatedPosts} />
        </div>
      </div>
    </article>
  );
}