'use client';

import { FaTwitter, FaLinkedin, FaFacebook, FaLink } from 'react-icons/fa';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Share:
      </span>
      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-500 hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <FaTwitter className="h-5 w-5" />
      </a>
      <a
        href={shareLinks.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-700 hover:text-white transition-colors"
        aria-label="Share on LinkedIn"
      >
        <FaLinkedin className="h-5 w-5" />
      </a>
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors"
        aria-label="Share on Facebook"
      >
        <FaFacebook className="h-5 w-5" />
      </a>
      <button
        onClick={copyToClipboard}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        aria-label="Copy link"
      >
        <FaLink className="h-5 w-5" />
      </button>
    </div>
  );
}