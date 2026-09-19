'use client';
import { timeAgo } from '@/utils/timeAgo';
export default function PopulerNews({ populerArticles, trending }) {
    console.log("Populer Articles:", populerArticles);
    console.log("Trending:", trending);
    if (!populerArticles || populerArticles.length === 0) return null;
    if (!trending || trending.length === 0) return null;

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

    const truncateText = (content, limit) => {
        if (!content) return '';
        const cleanText = content.replace(/<[^>]*>?/gm, '');
        const words = cleanText.split(/\s+/);
        if (words.length <= limit) return cleanText;
        return words.slice(0, limit).join(' ') + '...';
    };

    const populerArticle = populerArticles[0];
    const trendings = trending.slice(1, 5);
    return (
        <section className="bg-white mx-auto px-6 py-10 lg:px-20">
        <div className="flex items-center justify-between mb-9">
          <h2 className="text-4xl font-bold text-slate-700">Populer</h2>
          <a
            href="/articles"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition"
          >
            View more
            <i className="bx bx-chevron-right text-lg"></i>
          </a>
        </div>

        {populerArticle && (
          <a
            href={`/article/${populerArticle.slug}`}
            className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-[420px] md:h-[480px] lg:h-[650px] mb-6"
          >
            <img
              src={`http://127.0.0.1:8000/storage/${populerArticle.thumbnail}`}
              alt={populerArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <h3 className="text-gray-100 text-2xl md:text-4xl font-semibold leading-tight transition-colors">
                {populerArticle.title}
              </h3>

              <p className="hidden md:block text-slate-300 text-xl mt-5 line-clamp-2">
                {truncateText(populerArticle.content, 45)}
              </p>

              <div className="flex items-center gap-3 text-sm text-slate-500 mt-5">
                <div className="w-10 h-10 rounded-full bg-slate-700 text-lime-400 flex items-center justify-center font-semibold text-sm shrink-0">
                  {getInitials(populerArticle.user?.name)}
                </div>
                <span className="flex items-center gap-1.5 text-2xl text-gray-200">
                  {populerArticle.user?.name}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1.5 text-gray-200">
                  {timeAgo(populerArticle.created_at)}
                </span>
              </div>
            </div>
          </a>
        )}

        {/* 4 Artikel Trending */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          {trendings.map((news) => (
            <a
              key={news.id || news.slug}
              href={`/article/${news.slug}`}
              className="group relative block overflow-hidden transition-all duration-300 mb-6"
            >
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src={`http://127.0.0.1:8000/storage/${news.thumbnail}`}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="mt-1.5">
                <h3 className="text-xl font-bold text-gray-900 transition-colors line-clamp-2 min-h-[56px]">
                  {news.title}
                </h3>
                <p className="hidden md:block text-gray-600 text-lg mt-3 line-clamp-2">
                  {truncateText(news.content, 10)}
                </p>
                <div className="flex items-center gap-3 text-sm text-slate-500 mt-5 line-clamp-2 min-h-[56px]">
                  <div className="w-10 h-10 rounded-full bg-slate-700 text-lime-400 flex items-center justify-center font-semibold text-sm shrink-0">
                    {getInitials(news.user?.name)}
                  </div>
                  <span className="flex items-center gap-1.5 text-2xl text-gray-800">
                    {news.user?.name}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="flex items-center gap-1.5 text-gray-800">
                    {timeAgo(news.created_at)}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    );
}