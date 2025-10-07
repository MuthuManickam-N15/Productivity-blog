import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom components for MDX
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100">
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-gray-100 scroll-mt-20">
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100 scroll-mt-20">
        {children}
      </h3>
    ),
    a: ({ href, children }) => (
      <Link
        href={href || '#'}
        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
      >
        {children}
      </Link>
    ),
    img: ({ src, alt }) => (
      <div className="my-8">
        <Image
          src={src || ''}
          alt={alt || ''}
          width={1200}
          height={630}
          className="rounded-lg"
        />
      </div>
    ),
    code: ({ children, className }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      return <code className={className}>{children}</code>
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside my-6 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside my-6 space-y-2">{children}</ol>
    ),
    table: ({ children }) => (
      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    ...components,
  }
}