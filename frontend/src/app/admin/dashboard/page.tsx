'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  EnvelopeIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

interface Stats {
  totalPosts: number;
  publishedPosts: number;
  totalComments: number;
  pendingComments: number;
  newsletterSubscribers: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalComments: 0,
    pendingComments: 0,
    newsletterSubscribers: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch posts stats
      const postsRes = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts?limit=1000`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // You would need to create these endpoints in the backend
      // For now, we'll use mock data or calculate from posts
      
      setStats({
        totalPosts: postsRes.data.total || 0,
        publishedPosts: postsRes.data.data.filter((p: any) => p.published).length,
        totalComments: 0, // Would fetch from comments endpoint
        pendingComments: 0, // Would fetch from comments endpoint
        newsletterSubscribers: 0, // Would fetch from newsletter endpoint
        totalViews: postsRes.data.data.reduce((acc: number, post: any) => acc + (post.views || 0), 0),
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setLoading(false);
    }
  };

  const statCards = [
    {
      name: 'Total Posts',
      value: stats.totalPosts,
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      change: '+12%',
    },
    {
      name: 'Published',
      value: stats.publishedPosts,
      icon: DocumentTextIcon,
      color: 'bg-green-500',
      change: '+8%',
    },
    {
      name: 'Pending Comments',
      value: stats.pendingComments,
      icon: ChatBubbleLeftIcon,
      color: 'bg-yellow-500',
      change: '+3',
    },
    {
      name: 'Subscribers',
      value: stats.newsletterSubscribers,
      icon: EnvelopeIcon,
      color: 'bg-purple-500',
      change: '+24',
    },
    {
      name: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: EyeIcon,
      color: 'bg-pink-500',
      change: '+18%',
    },
    {
      name: 'Total Comments',
      value: stats.totalComments,
      icon: ChatBubbleLeftIcon,
      color: 'bg-indigo-500',
      change: '+5',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your blog.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-green-600 text-sm mt-2">{stat.change} from last month</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/posts/new"
            className="btn-primary text-center"
          >
            Create New Post
          </a>
          <a
            href="/admin/comments"
            className="btn-secondary text-center"
          >
            Review Comments
          </a>
          <a
            href="/admin/newsletter"
            className="btn-secondary text-center"
          >
            View Subscribers
          </a>
        </div>
      </div>
    </div>
  );
}