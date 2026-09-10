'use client';

export default function MatchScore({ standings, topScorers, topAssists }) {

    return (
        <section className="bg-white mx-auto px-6 py-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Klasemen */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-slate-700">La Liga Standings</h2>
              <a
                href="#"
                className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition group"
              >
                View more
                <i className="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

            {standings.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center">
                <i className="bx bx-error-circle text-4xl text-gray-300"></i>
                <p className="text-gray-500 text-sm mt-2">Data klasemen sedang tidak tersedia.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-900 text-white">
                        <th className="p-4 text-center font-semibold w-12">#</th>
                        <th className="p-4 text-left font-semibold">Klub</th>
                        <th className="p-4 text-center font-semibold">M</th>
                        <th className="p-4 text-center font-semibold">M</th>
                        <th className="p-4 text-center font-semibold">S</th>
                        <th className="p-4 text-center font-semibold">K</th>
                        <th className="p-4 text-center font-semibold hidden md:table-cell">SG</th>
                        <th className="p-4 text-center font-semibold text-lime-400">Poin</th>
                        <th className="p-4 text-center font-semibold hidden lg:table-cell">
                          5 Laga
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {standings.map((team) => {
                        const rank = team.rank;
                        const zoneColor =
                          rank <= 4
                            ? 'bg-indigo-500'
                            : rank === 5
                            ? 'bg-sky-500'
                            : rank >= 18
                            ? 'bg-red-500'
                            : 'bg-transparent';

                        return (
                          <tr key={team.team?.id || rank} className="hover:bg-gray-50 transition">
                            <td className="p-4 text-center relative">
                              <span
                                className={`absolute left-0 top-0 h-full w-1 ${zoneColor}`}
                              ></span>
                              <span className="font-bold text-gray-700">{rank}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={team.team?.logo}
                                  alt={team.team?.name}
                                  className="w-6 h-6 object-contain"
                                />
                                <span className="font-semibold text-gray-900">
                                  {team.team?.name}
                                </span>
                              </div>
                            </td>
                            <td className="p-4 text-center text-gray-600">{team.all?.played}</td>
                            <td className="p-4 text-center text-gray-600">{team.all?.win}</td>
                            <td className="p-4 text-center text-gray-600">{team.all?.draw}</td>
                            <td className="p-4 text-center text-gray-600">{team.all?.lose}</td>
                            <td className="p-4 text-center text-gray-600 hidden md:table-cell">
                              {team.goalsDiff}
                            </td>
                            <td className="p-4 text-center">
                              <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-lime-100 text-lime-700 font-extrabold">
                                {team.points}
                              </span>
                            </td>
                            <td className="p-4 hidden lg:table-cell">
                              <div className="flex items-center justify-center gap-1">
                                {(team.form || '').split('').map((result, i) => (
                                  <span
                                    key={i}
                                    className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-bold text-white ${
                                      result === 'W'
                                        ? 'bg-emerald-500'
                                        : result === 'D'
                                        ? 'bg-gray-400'
                                        : 'bg-red-500'
                                    }`}
                                  >
                                    {result}
                                  </span>
                                ))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 px-5 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Liga Champions
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> Liga Europa
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Degradasi
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Leaders & Assists */}
          <div className="flex flex-col gap-8">
            {/* Top Scorers */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-slate-700">La Liga Leaders</h2>
                <a
                  href="#"
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition group"
                >
                  View more
                  <i className="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="p-4 text-center font-semibold w-14">#</th>
                      <th className="p-4 text-left font-semibold">Pemain</th>
                      <th className="p-4 text-left font-semibold hidden md:table-cell">Klub</th>
                      <th className="p-4 text-center font-semibold">Main</th>
                      <th className="p-4 text-center font-semibold hidden sm:table-cell">Assist</th>
                      <th className="p-4 text-center font-semibold text-lime-400">Gol</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topScorers.map((player) => {
                      const rank = player.rank;
                      const rankStyle =
                        rank === 1
                          ? { bg: 'bg-yellow-400', text: 'text-gray-900', icon: 'bxs-star' }
                          : rank === 2
                          ? { bg: 'bg-gray-300', text: 'text-gray-900', icon: 'bxs-star' }
                          : rank === 3
                          ? { bg: 'bg-yellow-700', text: 'text-white', icon: 'bxs-star' }
                          : { bg: 'bg-transparent', text: 'text-gray-700', icon: null };

                      return (
                        <tr key={player.player?.id || rank} className="hover:bg-gray-50 transition">
                          <td className="p-4 text-center">
                            <div
                              className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${rankStyle.bg} ${rankStyle.text} font-extrabold text-sm relative`}
                            >
                              {rankStyle.icon && (
                                <i
                                  className={`bx ${rankStyle.icon} absolute -top-2 text-gray-900 text-sm`}
                                ></i>
                              )}
                              {rank}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={player.player?.photo}
                                alt={player.player?.name}
                                className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-gray-900 truncate">
                                  {player.player?.name}
                                </p>
                                <p className="text-xs text-gray-400 md:hidden">
                                  {player.statistics?.[0]?.team?.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <img
                                src={player.statistics?.[0]?.team?.logo}
                                alt={player.statistics?.[0]?.team?.name}
                                className="w-5 h-5 object-contain"
                              />
                              <span className="text-gray-600 text-sm">
                                {player.statistics?.[0]?.team?.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-center text-gray-500">
                            {player.statistics?.[0]?.games?.appearences}
                          </td>
                          <td className="p-4 text-center text-gray-500 hidden sm:table-cell">
                            {player.statistics?.[0]?.goals?.assists}
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg bg-lime-100 text-lime-700 font-extrabold">
                              {player.statistics?.[0]?.goals?.total}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Assists */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold text-slate-700">La Liga Top Assists</h2>
                <a
                  href="#"
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition group"
                >
                  View more
                  <i className="bx bx-right-arrow-alt text-lg group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="p-4 text-center font-semibold w-14">#</th>
                      <th className="p-4 text-left font-semibold">Pemain</th>
                      <th className="p-4 text-left font-semibold hidden md:table-cell">Klub</th>
                      <th className="p-4 text-center font-semibold">Main</th>
                      <th className="p-4 text-center font-semibold hidden sm:table-cell">Pass</th>
                      <th className="p-4 text-center font-semibold text-lime-400">Assists</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {topAssists.map((player) => {
                      const rank = player.rank;
                      const rankStyle =
                        rank === 1
                          ? { bg: 'bg-yellow-400', text: 'text-gray-900', icon: 'bxs-star' }
                          : rank === 2
                          ? { bg: 'bg-gray-300', text: 'text-gray-900', icon: 'bxs-star' }
                          : rank === 3
                          ? { bg: 'bg-yellow-700', text: 'text-white', icon: 'bxs-star' }
                          : { bg: 'bg-transparent', text: 'text-gray-700', icon: null };

                      return (
                        <tr key={player.player?.id || rank} className="hover:bg-gray-50 transition">
                          <td className="p-4 text-center">
                            <div
                              className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${rankStyle.bg} ${rankStyle.text} font-extrabold text-sm relative`}
                            >
                              {rankStyle.icon && (
                                <i
                                  className={`bx ${rankStyle.icon} absolute -top-2 text-gray-900 text-sm`}
                                ></i>
                              )}
                              {rank}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={player.player?.photo}
                                alt={player.player?.name}
                                className="w-10 h-10 rounded-full object-cover bg-gray-100 border border-gray-200 shrink-0"
                              />
                              <div className="min-w-0">
                                <p className="font-bold text-gray-900 truncate">
                                  {player.player?.name}
                                </p>
                                <p className="text-xs text-gray-400 md:hidden">
                                  {player.statistics?.[0]?.team?.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <img
                                src={player.statistics?.[0]?.team?.logo}
                                alt={player.statistics?.[0]?.team?.name}
                                className="w-5 h-5 object-contain"
                              />
                              <span className="text-gray-600 text-sm">
                                {player.statistics?.[0]?.team?.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-center text-gray-500">
                            {player.statistics?.[0]?.games?.appearences}
                          </td>
                          <td className="p-4 text-center text-gray-500 hidden sm:table-cell">
                            {player.statistics?.[0]?.passes?.total}
                          </td>
                          <td className="p-4 text-center">
                            <span className="inline-flex items-center justify-center min-w-[36px] h-9 px-2 rounded-lg bg-lime-100 text-lime-700 font-extrabold">
                              {player.statistics?.[0]?.goals?.assists}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex md:hidden justify-center mt-6">
              <a
                href="#"
                className="flex items-center gap-1.5 bg-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition"
              >
                Lihat Semua Top Scorer
                <i className="bx bx-right-arrow-alt text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
}