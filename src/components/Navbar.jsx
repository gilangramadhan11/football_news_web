'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { href: '/', label: 'Beranda', icon: 'bx-home-alt' },
        { href: '/berita', label: 'Berita', icon: 'bx-news' },
        { href: '/liga', label: 'Liga', icon: 'bx-trophy' },
        { href: '/transfer', label: 'Transfer', icon: 'bx-transfer' },
        { href: '/jadwal', label: 'Jadwal', icon: 'bx-calendar' },
    ];

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
                        {menuItems.map((item, idx) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`relative px-4 py-2 text-sm font-medium transition group ${
                                    idx === 0 ? 'text-white' : 'text-slate-300 hover:text-lime-400'
                                }`}
                            >
                                {item.label}
                                <span className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-lime-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
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
                <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-6 py-4 space-y-1">
                    <div className="relative mb-3">
                        <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
                        <input
                            type="text"
                            placeholder="Cari berita..."
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-9 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-lime-500/40"
                        />
                    </div>

                    {menuItems.map((item, idx) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm ${
                                idx === 0 ? 'text-white bg-slate-800/60 font-medium' : 'text-slate-300 hover:bg-slate-800'
                            }`}
                        >
                            <i className={`bx ${item.icon} ${idx === 0 ? 'text-lime-400' : ''}`}></i>
                            {item.label}
                        </Link>
                    ))}

                    <Link
                        href="/login"
                        className="flex items-center justify-center gap-2 bg-lime-500 text-slate-900 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-lime-400 transition mt-3"
                    >
                        <i className="bx bx-log-in-circle text-lg"></i>
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
}