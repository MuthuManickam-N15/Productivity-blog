import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import Image from 'next/image';
import Link from 'next/link';

interface PostContentProps {
  content: string;
}

// Custom components for MDX
const components = {
  Image: (props: any) => (
    <Image {...props} className="rounded-lg my-8" />
  ),
  a: (props: any) => {
    const href = props.href;
    const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

    if (isInternalLink) {
      return <Link {...props} className="text-primary-600 dark:text-primary-400 hover:underline" />;
    }

    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary-600 dark:text-primary-400 hover:underline"
      />
    );
  },
  pre: (props: any) => (
    <pre {...props} className="overflow-x-auto rounded-lg my-6" />
  ),
  code: (props: any) => {
    const { className, children } = props;
    const isInlineCode = !className;

    if (isInlineCode) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm">
          {children}
        </code>
      );
    }

    return <code {...props} />;
  },
};

export default function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose prose-lg dark:prose-dark max-w-none">
      <MDXRemote
        source={content}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [
              remarkGfm, // GitHub Flavored Markdown (tables, task lists, etc.)
            ],
            rehypePlugins: [
              rehypeSlug, // Add IDs to headings
              [
                rehypeAutolinkHeadings, // Add links to headings
                {
                  behavior: 'wrap',
                  properties: {
                    className: ['anchor'],
                  },
                },
              ],
              rehypePrism, // Syntax highlighting
            ],
          },
        }}
      />
    </article>
  );
}