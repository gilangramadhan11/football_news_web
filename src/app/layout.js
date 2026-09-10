import './globals.css';

export const metadata = {
  title: 'Football News',
  description: 'Portal berita sepak bola terkini',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}