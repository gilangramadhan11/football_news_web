'use client';

export default function MatchScore({ standings, weekFixtures }) {
    if (!weekFixtures || Object.keys(weekFixtures).length === 0) return null;

    return (
        <section className="bg-gray-50 mx-auto px-6 py-10 lg:px-20">
            <div className="flex items-center justify-between mb-9">
              <h2 className="text-4xl font-bold text-slate-700">Football match score</h2>
          <a
            href="/categories"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition"
          >
            View more
            <i className="bx bx-chevron-right text-lg"></i>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
          {Object.entries(weekFixtures).map(([date, leagues]) =>
            Object.entries(leagues).map(([leagueName, matches]) =>
              matches.map((match, idx) => (
                <div
                  key={match.fixture?.id || idx}
                  className="max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Header liga */}
                  <div className="flex items-center justify-between bg-gray-900 px-5 py-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={matches[0]?.league?.logo}
                        alt={matches[0]?.league?.name}
                        className="w-5 h-5 object-contain"
                      />
                      <span className="text-white text-xs font-bold">
                        {matches[0]?.league?.name}
                      </span>
                    </div>
                    <span className="text-gray-400 text-[11px] font-medium">
                      {match.fixture?.date}
                    </span>
                  </div>

                  {/* Status badge */}
                  <div className="flex justify-center pt-4">
                    <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide">
                      <i className="bx bxs-check-circle text-emerald-500"></i>
                      Full Time
                    </span>
                  </div>

                  {/* Skor utama */}
                  <div className="flex items-center justify-between px-6 py-6">
                    {/* Home team */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <img
                        src={match.teams?.home?.logo}
                        alt={match.teams?.home?.name}
                        className="w-14 h-14 object-contain"
                      />
                      <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                        {match.teams?.home?.name}
                      </span>
                    </div>

                    {/* Skor */}
                    <div className="flex items-center gap-3 px-4 shrink-0">
                      <span
                        className={`text-4xl font-extrabold ${
                          match.teams?.home?.winner ? 'text-slate-900' : 'text-gray-300'
                        }`}
                      >
                        {match.goals?.home}
                      </span>
                      <span className="text-2xl font-light text-gray-200">:</span>
                      <span
                        className={`text-4xl font-extrabold ${
                          match.teams?.away?.winner ? 'text-slate-900' : 'text-gray-300'
                        }`}
                      >
                        {match.goals?.away}
                      </span>
                    </div>

                    {/* Away team */}
                    <div className="flex flex-col items-center gap-2 flex-1">
                      <img
                        src={match.teams?.away?.logo}
                        alt={match.teams?.away?.name}
                        className="w-14 h-14 object-contain"
                      />
                      <span className="text-sm font-bold text-gray-900 text-center leading-tight">
                        {match.teams?.away?.name}
                      </span>
                    </div>
                  </div>

                  {/* Info tambahan: venue */}
                  <div className="flex items-center justify-center gap-1.5 pb-4 text-gray-400 text-xs">
                    <i className="bx bx-map"></i>
                    {match.fixture?.venue?.name || '-'}
                  </div>

                  {/* Footer CTA */}
                  <a
                    href="#"
                    className="flex items-center justify-center gap-1.5 bg-gray-50 hover:bg-indigo-50 text-gray-600 hover:text-indigo-600 py-3 text-sm font-semibold border-t border-gray-100 transition-colors group"
                  >
                    Lihat Detail Pertandingan
                    <i className="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform"></i>
                  </a>
                </div>
              ))
            )
          )}
        </div>
    </section>
    );
}