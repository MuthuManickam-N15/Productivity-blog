'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PostEditor from '@/components/admin/PostEditor';

export default function EditPost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${params.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPost(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch post:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <PostEditor post={post} isEdit={true} />
      </div>
    </div>
  );
}