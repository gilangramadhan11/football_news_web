'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const LEAGUE_NAMES = {
    'la-liga': 'La Liga',
    'premier-league': 'Premier League',
    'serie-a': 'Serie A',
};

export default function StandingsContent() {
    const params = useParams();
    const slug = params.slug;

    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchStandings() {
            setLoading(true);
            setError(false);

            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/standings/${slug}`);
                if (!res.ok) {
                    setError(true);
                    return;
                }
                const data = await res.json();
                setStandings(data.standings || []);
            } catch (err) {
                console.error('Gagal fetch standings:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        if (slug) fetchStandings();
    }, [slug]);

    const leagueName = LEAGUE_NAMES[slug] || 'Liga';

    if (loading) {
        return (
            <div className='grid grid-cols-1 bg-white lg:grid-cols-3 gap-8 items-stretch'>
                <div className="mx-auto w-full px-4 pt-10 sm:max-w-xl sm:px-6 md:max-w-3xl lg:col-span-3 lg:max-w-7xl">
                    <div className="animate-pulse space-y-4">
                        <div className="h-6 w-48 bg-gray-200 rounded"></div>
                        <div className="h-96 bg-gray-100 rounded-2xl"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || standings.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-6 py-20 pt-28 text-center">
                <i className="bx bx-error-circle text-5xl text-gray-300"></i>
                <h2 className="text-xl font-bold text-gray-700 mt-4">Data klasemen tidak tersedia</h2>
                <Link href="/" className="inline-flex items-center gap-1.5 mt-6 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition">
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 bg-white lg:grid-cols-3 gap-8 items-stretch'>
            <div className="mx-auto w-full px-4 pt-10 sm:max-w-xl sm:px-6 md:max-w-3xl lg:col-span-3 lg:max-w-7xl">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link href="/" className="hover:text-indigo-600">Home</Link>
                    <i className="bx bx-chevron-right text-gray-300"></i>
                    <span className="text-gray-400">Klasemen {leagueName}</span>
                </nav>

                {/* Tab ganti liga cepat */}
                <div className="flex gap-2 mb-8">
                    {Object.entries(LEAGUE_NAMES).map(([key, name]) => (
                        <Link
                            key={key}
                            href={`/standings/${key}`}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                key === slug
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            {name}
                        </Link>
                    ))}
                </div>

                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6">
                    Klasemen {leagueName}
                </h1>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="p-4 text-center font-semibold w-14">#</th>
                                <th className="p-4 text-left font-semibold">Klub</th>
                                <th className="p-4 text-center font-semibold">M</th>
                                <th className="p-4 text-center font-semibold">M</th>
                                <th className="p-4 text-center font-semibold">S</th>
                                <th className="p-4 text-center font-semibold">K</th>
                                <th className="p-4 text-center font-semibold hidden md:table-cell">SG</th>
                                <th className="p-4 text-center font-semibold text-lime-400">Poin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {standings.map((team) => {
                                const rank = team.rank;
                                const zoneColor =
                                    rank <= 4 ? 'bg-indigo-500' :
                                    rank === 5 ? 'bg-sky-500' :
                                    rank >= 18 ? 'bg-red-500' : 'bg-transparent';

                                return (
                                    <tr key={team.team.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4 text-center relative">
                                            <span className={`absolute left-0 top-0 h-full w-1 ${zoneColor}`}></span>
                                            <span className="font-bold text-gray-700">{rank}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={team.team.logo} alt={team.team.name} className="w-6 h-6 object-contain" />
                                                <span className="font-semibold text-gray-900">{team.team.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center text-gray-600">{team.all.played}</td>
                                        <td className="p-4 text-center text-gray-600">{team.all.win}</td>
                                        <td className="p-4 text-center text-gray-600">{team.all.draw}</td>
                                        <td className="p-4 text-center text-gray-600">{team.all.lose}</td>
                                        <td className="p-4 text-center text-gray-600 hidden md:table-cell">{team.goalsDiff}</td>
                                        <td className="p-4 text-center">
                                            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-lime-100 text-lime-700 font-extrabold">
                                                {team.points}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}