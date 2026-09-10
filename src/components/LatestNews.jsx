'use client';

import Image from 'next/image';
import { timeAgo } from '@/utils/timeAgo';

export default function LatestNews({ latest }) {
    if (!latest || latest.length === 0) return null;
    
    // Helper untuk inisial nama penuliss
    const getInitials = (name) => {
        if (!name) return '';
        return name
        .trim()
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join('');
    };
    
    // Helper estimasi waktu baca
    const getReadTime = (content) => {
        if (!content) return 1;
        const cleanText = content.replace(/<[^>]*>?/gm, '');
        const wordCount = cleanText.split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 200));
    };
    
    // Helper potong teks
    const truncateText = (content, limit) => {
        if (!content) return '';
        const cleanText = content.replace(/<[^>]*>?/gm, '');
        const words = cleanText.split(/\s+/);
        if (words.length <= limit) return cleanText;
        return words.slice(0, limit).join(' ') + '...';
    };
    
    const mainArticle = latest[0];
    const sideArticles = latest.slice(1, 4);
   
    return (
        <section className="bg-white mx-auto px-6 py-10 lg:px-20">
        <div className="flex items-center justify-between mb-9">
          <h2 className="text-4xl font-bold text-slate-700">Latest News</h2>
          <a
            href="/articles"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition"
          >
            View more
            <i className="bx bx-chevron-right text-lg"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article */}
          {mainArticle && (
            <div className="lg:col-span-2">
              <article className="group">
                <a
                  href={`/article/${mainArticle.slug}`}
                  className="block overflow-hidden rounded-2xl relative h-[420px]"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${mainArticle.thumbnail}`}
                    alt={mainArticle.title}
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition duration-500"
                  />
                </a>
                <div className="pt-5">
                  <span className="text-sm font-semibold text-lime-600">
                    {mainArticle.category?.name}
                  </span>
                  <h3 className="mt-2 text-3xl font-bold leading-tight text-slate-600">
                    <a
                      href={`/article/${mainArticle.slug}`}
                      className="hover:text-slate-600 transition"
                    >
                      {mainArticle.title}
                    </a>
                  </h3>
                  <p className="mt-3 text-slate-500 leading-relaxed">
                    {truncateText(mainArticle.content, 30)}
                  </p>
                  <div className="flex items-center gap-3 mt-5 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5">
                      <i className="bx bx-user"></i>
                      {mainArticle.user?.name}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5">
                      <i className="bx bx-time-five"></i>
                      {getReadTime(mainArticle.content)} min read
                    </span>
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Side Articles */}
          <div className="flex flex-col gap-7">
            {sideArticles.map((article) => (
              <article key={article.id || article.slug} className="group flex gap-4">
                <a
                  href={`/article/${article.slug}`}
                  className="w-64 h-42 shrink-0 overflow-hidden rounded-xl relative"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${article.thumbnail}`}
                    alt={article.title}
                    className="w-full h-full rounded-lg object-cover group-hover:scale-105 transition duration-500"
                  />
                </a>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <div className="w-10 h-10 rounded-full bg-slate-700 text-lime-400 flex items-center justify-center font-semibold text-sm shrink-0">
                      {getInitials(article.user?.name)}
                    </div>
                    <span className="flex items-center gap-1.5">
                      <i className="bx bx-user"></i>
                      {article.user?.name}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5">
                      {timeAgo(article.created_at)}
                    </span>
                  </div>
                  <p className="mt-3 text-slate-900 leading-relaxed font-semibold">
                    {truncateText(article.content, 15)}
                  </p>
                  <div className="mt-auto pt-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500">
                      <i className="bx bx-time-five"></i>
                      {getReadTime(article.content)} min read
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
}