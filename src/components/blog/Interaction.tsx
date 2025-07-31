'use client';

// Declare chrome as a global variable to avoid TypeScript errors in non-extension contexts
declare const chrome: any;

import { useState, useEffect, useRef } from 'react';
import { 
  ThumbsUp, 
  Bookmark, 
  Share2, 
  Link2
} from 'lucide-react';

interface BlogInteractionsProps {
  initialLikes: number;
  postTitle: string;
}

export default function BlogInteractions({ initialLikes, postTitle }: BlogInteractionsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareMenu]);

  // Reset copy success message
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => setCopySuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = postTitle;
    
    switch(platform) {
      case 'X':
        window.open(
          `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank',
          'noopener,noreferrer'
        );
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopySuccess(true);
        } catch (err) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          setCopySuccess(true);
        }
        break;
    }
    setShowShareMenu(false);
  };


  const handleBookmarkToggle = async () => {
  if (!isBookmarked) {
    // Add to Chrome bookmarks
    try {
      if (typeof chrome !== 'undefined' && chrome.bookmarks) {
        // For Chrome extension context
        await chrome.bookmarks.create({
          title: document.title || 'Bookmarked Page',
          url: window.location.href
        });
        console.log('Bookmark added to Chrome');
      } else {
        // Fallback: Prompt user to bookmark manually
        // Show manual bookmark prompt for all non-Chrome browsers
        console.log('Please press Ctrl+D (or Cmd+D on Mac) to bookmark this page');
      }
    } catch (error) {
      console.error('Failed to add bookmark:', error);
      // Fallback to manual bookmark prompt
      console.log('Please press Ctrl+D (or Cmd+D on Mac) to bookmark this page');
    }
  } else {
    // Remove from Chrome bookmarks (if possible)
    try {
      if (typeof chrome !== 'undefined' && chrome.bookmarks) {
        // Search for the bookmark and remove it
        const bookmarks = await chrome.bookmarks.search({
          url: window.location.href
        });
        
        if (bookmarks.length > 0) {
          await chrome.bookmarks.remove(bookmarks[0].id);
          console.log('Bookmark removed from Chrome');
        }
      }
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
    }
  }
  
  // Toggle the local bookmark state
  setIsBookmarked(!isBookmarked);
};

  return (
    <div className="flex items-center space-x-3">
      {/* Like Button */}
      {/* <button 
        onClick={handleLikeToggle}
        className={`flex items-center px-4 py-2 rounded-lg transition-all duration-200 ${
          isLiked 
            ? 'bg-red-50 text-red-600 border border-red-200' 
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
        }`}
        aria-label={isLiked ? 'Unlike this post' : 'Like this post'}
      >
        <ThumbsUp 
          size={18} 
          className={`mr-2 transition-transform duration-200 ${
            isLiked ? 'scale-110' : ''
          }`} 
        />
        <span className="font-medium">
          {isLiked ? initialLikes + 1 : initialLikes}
        </span>
      </button> */}
      
      {/* Bookmark Button */}
      {/* <button 
        onClick={handleBookmarkToggle}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isBookmarked 
            ? 'bg-blue-50 text-blue-600 border border-blue-200' 
            : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
        }`}
        aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
      >
        <Bookmark 
          size={18} 
          fill={isBookmarked ? 'currentColor' : 'none'} 
          className={`transition-transform duration-200 ${
            isBookmarked ? 'scale-110' : ''
          }`}
        />
      </button> */}
      <button 
  onClick={handleBookmarkToggle}
  className={`p-2 rounded-lg transition-all duration-200 ${
    isBookmarked 
      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
  }`}
  aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark this post'}
>
  <Bookmark 
    size={18} 
    fill={isBookmarked ? 'currentColor' : 'none'} 
    className={`transition-transform duration-200 ${
      isBookmarked ? 'scale-110' : ''
    }`}
  />
</button>
      
      {/* Share Button */}
      <div className="relative" ref={shareMenuRef}>
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className={`p-2 rounded-lg transition-all duration-200 ${
            showShareMenu 
              ? 'bg-blue-50 text-blue-600 border border-blue-200' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-transparent'
          }`}
          aria-label="Share this post"
          aria-expanded={showShareMenu}
        >
          <Share2 size={18} />
        </button>
        
        {/* Share Menu */}
        {showShareMenu && (
          <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg border py-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200">
            <button 
              onClick={() => handleShare('X')} 
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width={16} height={16} className="mr-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span>Share on X</span>
            </button>

            <button 
              onClick={() => handleShare('facebook')} 
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width={16} height={16} className="mr-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Share on Facebook</span>
            </button>

            <button 
              onClick={() => handleShare('linkedin')} 
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg width={16} height={16} className="mr-3 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span>Share on LinkedIn</span>
            </button>
            <hr className="my-1 border-gray-200" />
            <button 
              onClick={() => handleShare('copy')} 
              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Link2 size={16} className="mr-3 text-gray-500" />
              <span>{copySuccess ? 'Link copied!' : 'Copy link'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Copy Success Toast */}
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Link copied to clipboard!
          </div>
        </div>
      )}
    </div>
  );
}