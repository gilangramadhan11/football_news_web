import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryDetailClient from '@/components/CategoryDetailClient';

async function getCategoryArticles(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${slug}/articles`, {
        cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;   
    const data = await getCategoryArticles(slug);

    if (!data) {
        notFound();
    }

    return (
      <>
          <div className="pt-16">
              <CategoryDetailClient
                 categories={data} 
              />
          </div>
      </>
    );
}