'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { timeAgo } from '@/utils/timeAgo';
import ArticleSidebar from "./ArticleSidebar";

export default function ArticleDetailClient({
  article,
  initialLiked = false,
  relatedArticles = [],
  sidebarContent = null,
  categories = [],
  breakingNews = []
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(article?.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper estimasi waktu baca
  const getReadTime = (content) => {
    if (!content) return 1;
    const cleanText = content.replace(/<[^>]*>?/gm, '');
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // Helper potong teks
  const truncateText = (text, limit) => {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
  };

  // Handler Like
  const handleLike = async () => {
    if (liked || isLiking) return;

    setIsLiking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${article.id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.likes ?? likeCount + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error('Failed to like article:', error);
    } finally {
      setIsLiking(false);
    }
  };

  // Handler Copy Link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
    }
  };

  const backendUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://footballnews-production.up.railway.app'
      : 'http://127.0.0.1:8000';

  if (!article) return null;

  return (
    <div className="grid grid-cols-1 bg-white lg:grid-cols-4 gap-8 items-stretch">
      {/* KONTEN UTAMA */}
      <div className="mx-auto w-full px-4 pt-10 sm:max-w-xl sm:px-6 md:max-w-3xl lg:col-span-3 lg:max-w-7xl">
        {/* Breadcrumb */}
        <nav className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
            <i className="bx bx-home-alt text-base"></i> Home
          </Link>
          <i className="bx bx-chevron-right text-gray-300"></i>
          <Link
            href={`/articles?category=${article.category?.id}`}
            className="hover:text-indigo-600 transition-colors"
          >
            {article.category?.name}
          </Link>
          <i className="bx bx-chevron-right text-gray-300"></i>
          <span className="text-gray-400 truncate max-w-[200px] md:max-w-xs" title={article.title}>
            {truncateText(article.title, 40)}
          </span>
        </nav>

        {/* Judul */}
        <h1 className="text-5xl text-slate-700 font-bold leading-tight mt-4">
          {article.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 mt-5">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
            <span className="text-sm text-slate-700 font-semibold">
                {article.user?.name}</span>
          </div>

          <span className="bg-gray-100 text-slate-700 font-semibold px-3 py-1 rounded-full text-sm">
                {article.category?.name}
          </span>

          <span className="inline-flex items-center gap-1 bg-gray-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
            {article.formatted_published_at || 'Baru saja'}
          </span>

          <span className='text-slate-800'>•</span>

          <span className="inline-flex items-center gap-1 bg-gray-100 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold">
            {getReadTime(article.content)} menit membaca
          </span>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-slate-700 px-3 py-1 rounded-full text-sm font-semibold transition cursor-pointer"
          >
            {copied ? (
              <>
                <i className="bx bx-check text-xl text-green-600"></i> Copied
              </>
            ) : (
              <>
                <i className="bx bx-copy text-xl"></i> Copy Link
              </>
            )}
          </button>

          {/* Like Button */}
          <button
            type="button"
            onClick={handleLike}
            disabled={liked || isLiking}
            className={`inline-flex ml-auto gap-1.5 items-center transition ${
              liked ? 'cursor-not-allowed text-red-600' : 'hover:text-red-600 text-slate-800 cursor-pointer'
            }`}
          >
            <i
              className={`bx bxs-heart text-xl ${liked ? 'text-red-600' : 'text-white'}`}
              style={!liked ? { WebkitTextStroke: '1.5px black' } : {}}
            ></i>
            <span className="font-semibold text-sm">{likeCount}</span>
          </button>
        </div>
        
        <div>
            {/* Thumbnail */}
            {article.thumbnail && (
                <div className="relative mt-8 w-full lg:h-[800px] md:h-[500px] sm:h-[400px] h-[200] overflow-hidden rounded-4xl shadow-xl">
                <Image
                    src={`${backendUrl}/storage/${article.thumbnail}`}
                    alt={article.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover transition duration-300 hover:scale-[1.01]"
                />
                </div>
            )}

            {/* Content */}
            {/* Isi Artikel */}
            <div className="bg-white rounded-2xl mt-8 text-slate-700">
                <article
                    className="
                    prose prose-lg lg:prose-xl max-w-none
                    prose-headings:font-bold
                    prose-headings:text-slate-900
                    prose-p:text-slate-700
                    prose-p:leading-relaxed
                    prose-a:text-blue-600
                    prose-img:rounded-xl
                    space-y-4
                    "
                    dangerouslySetInnerHTML={{ __html: article?.content || '' }}
                />
            </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 mb-6">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Artikel Terkait</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <div key={related.id || related.slug} className="bg-white rounded-xl">
                  {related.thumbnail && (
                    <div className="relative w-full h-36 rounded-2xl overflow-hidden">
                      <Image
                        src={`${backendUrl}/storage/${related.thumbnail}`}
                        alt={related.title}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="py-4">
                    <div className="text-xs text-blue-600 mb-2">{related.category?.name}</div>
                    <Link
                      href={`/article/${related.slug}`}
                      className="font-bold text-slate-600 hover:text-slate-800 line-clamp-2"
                    >
                      {truncateText(related.title, 55)}
                    </Link>
                    <div className="text-xs text-slate-500 mt-3">
                      {timeAgo(related.created_at)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SIDEBAR */}
      <aside className="h-full bg-gray-50 rounded-3xl space-y-6 p-10 lg:col-span-1">
        <ArticleSidebar
                    categories={article.categories || []}
                    breakingNews={article.breakingNews || []}
                />
      </aside>
    </div>
  );
}