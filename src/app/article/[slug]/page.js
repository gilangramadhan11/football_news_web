import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import ArticleDetailClient from '@/components/ArticleDetailClient';

async function getArticle(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.data || data; // Menangani wrapper respons data dari Laravel API
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const articleData = await getArticle(slug);
  if (!articleData) {
    notFound();
  }

  return (
    <>
    <Navbar />
        <div className="pt-16">
            <ArticleDetailClient 
                article={articleData} 
                relatedArticles={articleData.related_articles || []}
            />
        </div>
    </>
  );
}