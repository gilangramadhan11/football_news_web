'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar({ categories = [], setIsOpen }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [standingsOpen, setStandingsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const [openDropdown, setOpenDropdown] = useState(null); // 'categories' | 'standings' | null
    const [searchQuery, setSearchQuery] = useState('');
    // Toggle buka/tutup accordion
    const toggleDropdown = (menuName) => {
        setOpenDropdown((prev) => (prev === menuName ? null : menuName));
    };

    // Handler Submit Pencarian
    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter' && searchQuery.trim()) {
        if (setIsOpen) setIsOpen(false); // Tutup mobile menu saat navigate
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { href: '/', label: 'Beranda', icon: 'bx-home-alt' },
        { href: '/liga', label: 'Liga', icon: 'bx-trophy' },
        { href: '/transfer', label: 'Transfer', icon: 'bx-transfer' },
        { href: '/jadwal', label: 'Jadwal', icon: 'bx-calendar' },
    ];
    const leagues = [
        { slug: 'la-liga', name: 'La Liga', logo: 'https://media.api-sports.io/football/leagues/140.png' },
        { slug: 'premier-league', name: 'Premier League', logo: 'https://media.api-sports.io/football/leagues/39.png' },
        { slug: 'serie-a', name: 'Serie A', logo: 'https://media.api-sports.io/football/leagues/135.png' },
    ];
    
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const isActive = (path) => pathname === path;
    const isCategoryActive = pathname.startsWith('/category');
    const isStandingActive = pathname.startsWith('/standing');

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 transition-all duration-300 ${
            scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-slate-900/70 backdrop-blur-sm'
        }`}>
            <div className="mx-auto px-6">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0">
                        <i className="bx bx-football text-3xl text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.6)]"></i>
                        <span className="text-xl font-extrabold text-white tracking-tight">
                            Football<span className="text-lime-400">News</span>
                        </span>
                    </Link>

                    {/* Menu Tengah (Desktop) */}
                    <div className="hidden lg:flex items-center gap-1">
                        {/* 1. Beranda & Berita */}
                        {menuItems.slice(0, 1).map((item) => (
                            <Link
                            key={item.href}
                            href={`/`}
                            className={`relative px-4 py-2 text-sm font-medium transition group ${
                                isActive(item.href) ? 'text-white font-semibold' : 'text-slate-300 hover:text-lime-400'
                            }`}
                            >
                            {item.label}
                            <span
                                className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-lime-400 transition-transform origin-left ${
                                isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}
                            ></span>
                            </Link>
                        ))}

                        {/* 2. Menu DROPDOWN CATEGORIES (Dinamis dari Laravel) */}
                        <div
                            className="relative group py-2"
                            onMouseEnter={() => setIsCategoryOpen(true)}
                            onMouseLeave={() => setIsCategoryOpen(false)}
                        >
                            <button
                            type="button"
                            className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition ${
                                isCategoryActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-lime-400'
                            }`}
                            >
                            Kategori Berita
                            <i
                                className={`bx bx-chevron-down transition-transform duration-200 ${
                                isCategoryOpen ? 'rotate-180 text-lime-400' : ''
                                }`}
                            ></i>
                            <span
                                className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-lime-400 transition-transform origin-left ${
                                isCategoryActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}
                            ></span>
                            </button>

                            {/* Dropdown Menu */}
                            <div
                            className={`absolute left-0 top-full mt-1 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 transition-all duration-200 ${
                                isCategoryOpen
                                ? 'opacity-100 visible translate-y-0'
                                : 'opacity-0 invisible -translate-y-2'
                            }`}
                            >
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                <Link
                                    key={cat.id || cat.slug}
                                    href={`/category/${cat.slug}`}
                                    className={`flex items-center justify-between px-4 py-2.5 text-sm transition hover:bg-slate-800/80 hover:text-lime-400 ${
                                    pathname === `/category/${cat.slug}`
                                        ? 'text-lime-400 font-semibold bg-slate-800/50'
                                        : 'text-slate-300'
                                    }`}
                                >
                                    <span>{cat.name}</span>
                                    {cat.articles_count !== undefined && (
                                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                                        {cat.articles_count}
                                    </span>
                                    )}
                                </Link>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-xs text-slate-500">Tidak ada kategori</div>
                            )}
                            </div>
                        </div>
                        
                        <div
                            className="relative group py-2"
                            onMouseEnter={() => setStandingsOpen(true)}
                            onMouseLeave={() => setStandingsOpen(false)}
                        >
                            <button 
                                type='button'
                                className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition ${
                                isStandingActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-lime-400'
                            }`}
                            >
                                Klasemen
                                <i className={`bx bx-chevron-down transition-transform duration-200 ${standingsOpen ? 'rotate-180' : ''}`}></i>
                                <span
                                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-lime-400 transition-transform origin-left ${
                                    isStandingActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                    }`}
                                ></span>
                            </button>

                            {standingsOpen && (
                                <div 
                                    className={`absolute left-0 top-full mt-1 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl py-2 z-50 transition-all duration-200 ${
                                    standingsOpen
                                    ? 'opacity-100 visible translate-y-0'
                                    : 'opacity-0 invisible -translate-y-2'
                                }`}>
                                    {leagues.map((league) => (
                                        <Link
                                            key={league.slug}
                                            href={`/standings/${league.slug}`}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:bg-slate-700 hover:text-lime-400 transition"
                                        >
                                            <img src={league.logo} alt={league.name} className="w-5 h-5 object-contain" />
                                            {league.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 3. Sisa Menu Lain (Transfer, Jadwal, Klasemen) */}
                        {menuItems.slice(2).map((item) => (
                            <Link
                            key={item.href}
                            href={item.href}
                            className={`relative px-4 py-2 text-sm font-medium transition group ${
                                isActive(item.href) ? 'text-white font-semibold' : 'text-slate-300 hover:text-lime-400'
                            }`}
                            >
                            {item.label}
                            <span
                                className={`absolute left-4 right-4 -bottom-0.5 h-0.5 bg-lime-400 transition-transform origin-left ${
                                isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                }`}
                            ></span>
                            </Link>
                        ))}
                        </div>

                    {/* Kanan: Search + CTA (Desktop) */}
                    <div className="hidden lg:flex items-center gap-3">
                        <div className="relative">
                            <button
                                onClick={() => setSearchOpen(!searchOpen)}
                                className="w-9 h-9 flex items-center justify-center rounded-full text-slate-300 hover:bg-slate-800 hover:text-lime-400 transition"
                            >
                                <i className="bx bx-search text-xl"></i>
                            </button>
                            {searchOpen && (
                                <div className="absolute right-0 mt-2 w-72 bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-2">
                                    <div className="relative">
                                        <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                                        <input
                                            type="text"
                                            placeholder="Cari berita..."
                                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/40 focus:border-lime-500/50"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/login"
                            className="flex items-center gap-2 bg-lime-500 text-slate-900 px-5 py-2 rounded-full text-sm font-semibold hover:bg-lime-400 hover:shadow-[0_0_20px_rgba(163,230,53,0.4)] transition-all duration-300"
                        >
                            <i className="bx bx-log-in-circle text-lg"></i>
                            Login
                        </Link>
                    </div>

                    {/* Hamburger (Mobile) */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-slate-800 transition"
                    >
                        <i className={`bx text-2xl ${mobileOpen ? 'bx-x' : 'bx-menu'}`}></i>
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-2">
                    {/* Search Input */}
                    <div className="relative mb-3">
                        <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                        <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleSearchSubmit}
                        placeholder="Cari berita & tekan enter..."
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
                        />
                    </div>

                    {/* Menu 1: Beranda */}
                    <Link
                        href="/"
                        onClick={() => setIsOpen && setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                        isActive('/')
                            ? 'text-white bg-slate-800/60 font-medium'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        <i className={`bx bx-home-alt ${isActive('/') ? 'text-lime-400' : ''}`}></i>
                        Beranda
                    </Link>

                    {/* Menu 3: ACCORDION KATEGORI (DROPDOWN) */}
                    <div className="rounded-lg overflow-hidden">
                        <button
                        type="button"
                        onClick={() => toggleDropdown('categories')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition ${
                            pathname.startsWith('/category')
                            ? 'text-white bg-slate-800/60 font-medium'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            <i className={`bx bx-category ${pathname.startsWith('/category') ? 'text-lime-400' : ''}`}></i>
                            <span>Kategori</span>
                        </div>
                        <i
                            className={`bx bx-chevron-down text-lg transition-transform duration-200 ${
                            openDropdown === 'categories' ? 'rotate-180 text-lime-400' : ''
                            }`}
                        ></i>
                        </button>

                        {/* Sub-menu Kategori */}
                        <div
                        className={`pl-9 pr-3 space-y-1 transition-all duration-200 overflow-hidden ${
                            openDropdown === 'categories' ? 'max-h-60 py-2' : 'max-h-0 py-0'
                        }`}
                        >
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                            <Link
                                key={cat.id || cat.slug}
                                href={`/category/${cat.slug}`}
                                onClick={() => setIsOpen && setIsOpen(false)}
                                className={`block py-2 text-sm transition ${
                                pathname === `/category/${cat.slug}`
                                    ? 'text-lime-400 font-semibold'
                                    : 'text-slate-400 hover:text-slate-200'
                                }`}
                            >
                                {cat.name}
                            </Link>
                            ))
                        ) : (
                            <span className="text-xs text-slate-500 py-1 block">Tidak ada kategori</span>
                        )}
                        </div>
                    </div>

                    {/* Menu 4: ACCORDION KLASEMEN (DROPDOWN) */}
                    <div className="rounded-lg overflow-hidden">
                        <button
                        type="button"
                        onClick={() => toggleDropdown('standings')}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition ${
                            pathname.startsWith('/klasemen')
                            ? 'text-white bg-slate-800/60 font-medium'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                        >
                        <div className="flex items-center gap-3">
                            <i className={`bx bx-trophy ${pathname.startsWith('/klasemen') ? 'text-lime-400' : ''}`}></i>
                            <span>Klasemen</span>
                        </div>
                        <i
                            className={`bx bx-chevron-down text-lg transition-transform duration-200 ${
                            openDropdown === 'standings' ? 'rotate-180 text-lime-400' : ''
                            }`}
                        ></i>
                        </button>

                        {/* Sub-menu Klasemen */}
                        <div
                        className={`pl-9 pr-3 space-y-1 transition-all duration-200 overflow-hidden ${
                            openDropdown === 'standings' ? 'max-h-60 py-2' : 'max-h-0 py-0'
                        }`}
                        >
                        {leagues.map((league) => (
                            <Link
                            key={league.slug}
                            href={`/standings/${league.slug}`}
                            onClick={() => setIsOpen && setIsOpen(false)}
                            className={`block py-2 text-sm transition ${
                                pathname === `/standings/${league.slug}`
                                ? 'text-lime-400 font-semibold'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                            >
                            {league.name}
                            </Link>
                        ))}
                        </div>
                    </div>

                    {/* Menu 5: Jadwal */}
                    <Link
                        href="/jadwal"
                        onClick={() => setIsOpen && setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                        isActive('/jadwal')
                            ? 'text-white bg-slate-800/60 font-medium'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                    >
                        <i className={`bx bx-calendar ${isActive('/jadwal') ? 'text-lime-400' : ''}`}></i>
                        Jadwal
                    </Link>

                    {/* Tombol Login */}
                    <Link
                        href="/login"
                        onClick={() => setIsOpen && setIsOpen(false)}
                        className="flex items-center justify-center gap-2 bg-lime-500 text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-lime-400 transition mt-4"
                    >
                        <i className="bx bx-log-in-circle text-lg"></i>
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
}