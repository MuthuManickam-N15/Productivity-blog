'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import BlogCard from '../blog/BlogCard';
import { Post } from '@/types';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold font-heading mb-2">
              Recent Articles
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Latest productivity tips and insights
            </p>
          </motion.div>

          <Link
            href="/blog"
            className="hidden md:flex items-center text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            View All
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/blog" className="btn-primary inline-flex items-center">
            View All Articles
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}