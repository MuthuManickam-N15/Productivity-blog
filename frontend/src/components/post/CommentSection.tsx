'use client';

import { useState } from 'react';
import axios from 'axios';

interface CommentSectionProps {
  postSlug: string;
}

export default function CommentSection({ postSlug }: CommentSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
        postSlug,
        author: name,
        email,
        content: comment,
      });
      setStatus('success');
      setName('');
      setEmail('');
      setComment('');
      alert('Comment submitted! It will appear after approval.');
    } catch (error) {
      setStatus('error');
      alert('Failed to submit comment. Please try again.');
    }
  };

  return (
    <section className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-3xl font-bold mb-8">Leave a Comment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Comment *
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </section>
  );
}