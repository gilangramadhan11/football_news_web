'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar({
  categories = [],
  breakingNews = [],
  articleTitle = 'Check this out!',
}) {

  const [shareUrl, setShareUrl] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Ambil URL saat ini di sisi client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
  }, []);

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(articleTitle);

  // Helper potong teks judul
  const truncateText = (text, limit) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  const backendUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://footballnews-production.up.railway.app'
      : 'http://127.0.0.1:8000';

  // Handler Submit Newsletter
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Tambahkan logika kirim email ke API kamu di sini
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="rounded-xl">
      {/* Share on Social Media */}
      <h3 className="text-lg font-semibold text-slate-700 mb-2">
        Share on Social Media
      </h3>
      <div className="flex gap-1 flex-wrap pb-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-instagram text-2xl"></i>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-facebook-circle text-slate-700 text-2xl"></i>
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-twitter text-2xl"></i>
        </a>
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-linkedin text-2xl"></i>
        </a>
        <a
          href={`https://www.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-whatsapp text-2xl"></i>
        </a>
        <a
          href={`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-slate-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <i className="bx bxl-telegram text-2xl"></i>
        </a>
      </div>

      {/* All Tags */}
      <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-6">All Tags</h3>
      <div className="flex gap-3 flex-wrap pb-4">
        {categories.map((tag) => (
          <Link
            key={tag.id || tag.slug}
            href={`/articles?category=${tag.id}`}
            className="bg-white text-slate-700 px-4 py-2 rounded-lg font-mono font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            {tag.name}
          </Link>
        ))}
      </div>

      {/* Breaking News */}
      <h3 className="text-lg font-semibold text-slate-700 mb-2 mt-6">Breaking News</h3>
      <div className="flex flex-col items-start gap-4">
        {breakingNews.slice(0, 3).map((relatedArticle) => (
          <Link
            key={relatedArticle.id || relatedArticle.slug}
            href={`/article/${relatedArticle.slug}`}
            className="flex items-start gap-3 rounded-lg pb-5 transition-shadow duration-200"
          >
            {relatedArticle.thumbnail ? (
              <div className="relative w-42 h-24 shrink-0 rounded-2xl overflow-hidden">
                <Image
                    src={`${backendUrl}/storage/${relatedArticle.thumbnail}`}
                    alt={relatedArticle.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover transition duration-300 hover:scale-[1.01]"
                />
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 shrink-0">
                <i className="bx bx-image text-2xl"></i>
              </div>
            )}
            <div className="flex flex-col justify-start">
              <span className="text-sm text-slate-500 font-semibold">
                {relatedArticle.published_at
                    ? new Date(relatedArticle.published_at).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        })
                    : 'Baru saja'}
              </span>
              <span
                className="mt-4 text-lg font-bold text-slate-700 line-clamp-2"
                title={relatedArticle.title}
              >
                {truncateText(relatedArticle.title, 100)}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mx-auto p-6 sm:px-6 lg:px-8">
        <hr className="border-slate-200" />
      </div>

      {/* Join Our Newsletter */}
      <div className="mx-auto text-start">
        <h2 className="text-4xl font-bold text-slate-700 sm:text-4xl">
          Join Our Newsletter
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          Get the latest football news, match updates, and exclusive stories
          delivered straight to your inbox.
        </p>

        <form onSubmit={handleNewsletterSubmit} className="mt-6">
          <div className="mx-auto flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 placeholder-slate-500 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-400/20"
            />
          </div>
          <div className="mx-auto flex flex-col gap-3 sm:flex-row mt-3">
            <button
              type="submit"
              className="w-full border border-slate-200 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 focus:ring-offset-slate-900 cursor-pointer"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}