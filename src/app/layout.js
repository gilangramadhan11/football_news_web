import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Football News',
  description: 'Portal berita sepak bola terkini',
};

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok) return [];

    const result = await res.json();
    const data = result.data || result;

    // Ambil data categories dari response API /home
    return data.categories || [];
  } catch (error) {
    console.error('Failed to fetch categories in layout:', error);
    return [];
  }
}

export default async function RootLayout({ children }) {
  const categories = await getCategories();
  return (
    <html lang="id">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900">
        <Navbar categories={categories} />
        {children}
      </body>
    </html>
  );
}