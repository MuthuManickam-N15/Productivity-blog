import Image from 'next/image';
import { CalendarIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';
import { Post } from '@/types';

interface PostHeaderProps {
  post: Post;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <header className="mb-12">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
          {post.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
        {post.title}
      </h1>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8">
        <div className="flex items-center">
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900 dark:text-gray-100">
              {post.author.name}
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center">
                <ClockIcon className="h-4 w-4 mr-1" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 mt-6">
          <TagIcon className="h-5 w-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}