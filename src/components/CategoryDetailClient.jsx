'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ArticleSidebar from "./ArticleSidebar";

export default function CategoryContent(categories) {
    const params = useParams();
    const searchParams = useSearchParams();
    const slug = params.slug;
    const page = searchParams.get('page') || 1;

    const [category, setCategory] = useState(null);
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFoundError, setNotFoundError] = useState(false);

    const backendUrl =
    process.env.NODE_ENV === 'production'
      ? 'https://footballnews-production.up.railway.app'
      : 'http://127.0.0.1:8000';

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setNotFoundError(false);

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}/articles?page=${page}`
                );

                if (!res.ok) {
                    setNotFoundError(true);
                    return;
                }

                const data = await res.json();
                setCategory(data.category);
                setArticles(data.articles);
            } catch (error) {
                console.error('Gagal fetch kategori:', error);
                setNotFoundError(true);
            } finally {
                setLoading(false);
            }
        }

        if (slug) {
            fetchData();
        }
    }, [slug, page]);

    // Loading state
    if (loading) {
        return (
            <div className="bg-white mx-auto px-6 py-10 pt-28">
                <div className="animate-pulse space-y-6">
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-8 w-64 bg-gray-200 rounded"></div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-64 bg-gray-100 rounded-2xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // Error / not found state
    if (notFoundError || !category) {
        return (
            <div className="bg-white mx-auto px-6 py-20 pt-28 text-center">
                <i className="bx bx-error-circle text-5xl text-gray-300"></i>
                <h2 className="text-xl font-bold text-gray-700 mt-4">Kategori tidak ditemukan</h2>
                <p className="text-gray-500 text-sm mt-1">Kategori yang kamu cari mungkin sudah dihapus atau salah URL.</p>
                <Link href="/" className="inline-flex items-center gap-1.5 mt-6 bg-gray-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-700 transition">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 bg-white lg:grid-cols-3 gap-8 items-stretch'>
            <div className="mx-auto w-full px-4 pt-10 sm:max-w-xl sm:px-6 md:max-w-3xl lg:col-span-3 lg:max-w-7xl">

                {/* Breadcrumb */}
                <nav className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center gap-1.5 hover:text-gray-600 transition-colors">
                    <i className="bx bx-home-alt text-base"></i> Home
                </Link>
                <i className="bx bx-chevron-right text-gray-300"></i>
                <Link
                    href={`/`}
                    className="hover:text-gray-600 transition-colors"
                >
                    {category.name}
                </Link>
                </nav>

                {/* Header kategori */}
                <div className="mb-8">
                    <h1 className="text-5xl text-slate-700 font-bold leading-tight mt-4">
                        {category.name}
                    </h1>
                </div>

                {/* Grid artikel */}
                {articles.data.length === 0 ? (
                    <div className="bg-gray-50 rounded-2xl p-12 text-center">
                        <i className="bx bx-file-blank text-4xl text-gray-300"></i>
                        <p className="text-gray-500 text-sm mt-2">Belum ada artikel di kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {articles.data.map((article) => (
                            <Link
                                key={article.id}
                                href={`/article/${article.slug}`}
                                className="group bg-white transition-all duration-300 overflow-hidden"
                            >
                                <div className="h-44 overflow-hidden rounded-2xl">
                                    <img
                                        src={`${backendUrl}/storage/${article.thumbnail}`}
                                        alt={article.title}
                                        fill
                                        unoptimized
                                        className="w-full h-full  object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <div className="py-4">
                                    <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors">
                                        {article.title}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-3 text-gray-400 text-xs">
                                        <span>{new Date(article.published_at).toLocaleDateString('id-ID')}</span>
                                        <span>{article.views} views</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {articles.last_page > 1 && (
                    <div className="flex justify-center gap-2 mt-10 pb-10">
                        {Array.from({ length: articles.last_page }, (_, i) => i + 1).map((pageNum) => (
                            <Link
                                key={pageNum}
                                href={`/category/${slug}?page=${pageNum}`}
                                className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-semibold transition ${
                                    pageNum === articles.current_page
                                        ? 'bg-gray-600 text-white'
                                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {pageNum}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}