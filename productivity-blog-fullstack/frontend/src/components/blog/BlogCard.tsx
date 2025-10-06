import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ClockIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { Post } from '@/types';

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            {post.category}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {post.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
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

          <div className="mt-4 flex items-center">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="ml-2 text-sm font-medium">
              {post.author.name}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}