'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Comment {
  _id: string;
  author: string;
  email: string;
  content: string;
  approved: boolean;
  createdAt: string;
  post: {
    title: string;
  };
}

export default function AdminComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const token = localStorage.getItem('token');
      // You'll need to create this endpoint
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.error('Failed to approve comment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComments();
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  const filteredComments = comments.filter((comment) => {
    if (filter === 'pending') return !comment.approved;
    if (filter === 'approved') return comment.approved;
    return true;
  });

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
        <h1 className="text-3xl font-bold mb-2">Comments</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and moderate blog comments
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-6 flex space-x-4">
        {['all', 'pending', 'approved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 rounded-lg font-medium ${
              filter === tab
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No comments found</p>
          </div>
        ) : (
          filteredComments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold">{comment.author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {comment.email}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    On: {comment.post?.title || 'Unknown post'}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {!comment.approved && (
                    <button
                      onClick={() => handleApprove(comment._id)}
                      className="p-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800"
                      title="Approve"
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="p-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800"
                    title="Delete"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">
                {comment.content}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
                <span
                  className={`px-2 py-1 rounded-full ${
                    comment.approved
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}
                >
                  {comment.approved ? 'Approved' : 'Pending'}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}