import { useState } from 'react';
import { useTrips } from '../context/TripContext';
import { CONTINENT_LABELS } from '../types';

export default function WorldMap() {
  const { countries, stats } = useTrips();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const maxVisits = Math.max(...countries.map(c => c.visitCount), 1);

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">🗺️</span>
        <h2 className="text-xl font-bold text-gray-800">아직 여행 기록이 없어요</h2>
        <p className="text-gray-500 mt-2">여행을 추가하면 지도에 표시돼요!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">세계 지도 🗺️</h2>
      <p className="text-gray-500 mb-6">
        {stats.totalCountries}개국 · {stats.totalContinents}개 대륙
      </p>

      {/* Map placeholder with emoji-based visualization */}
      <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🌏</div>
          <h3 className="text-lg font-bold text-gray-700 mb-4">방문한 국가</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-xl">
            {countries.map((c) => {
              const intensity = c.visitCount / maxVisits;
              const isHovered = hoveredCountry === c.countryCode;
              return (
                <div
                  key={c.countryCode}
                  className={`cursor-pointer transition-all duration-200 ${
                    isHovered ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  onMouseEnter={() => setHoveredCountry(c.countryCode)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <div
                    className="rounded-xl px-3 py-2 text-center shadow-sm border-2"
                    style={{
                      backgroundColor: `rgba(30, 58, 95, ${0.1 + intensity * 0.3})`,
                      borderColor: isHovered ? '#e67e22' : `rgba(30, 58, 95, ${0.2 + intensity * 0.4})`,
                    }}
                  >
                    <div className="text-2xl">{c.flag}</div>
                    <div className="text-xs font-bold text-gray-700 mt-1">{c.country}</div>
                    <div className="text-[10px] text-gray-500">{c.visitCount}회</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hovered country detail */}
        {hoveredCountry && (() => {
          const c = countries.find(c => c.countryCode === hoveredCountry);
          if (!c) return null;
          return (
            <div className="mt-4 p-4 bg-primary/5 rounded-xl text-center">
              <span className="text-3xl">{c.flag}</span>
              <div className="font-bold text-gray-800 mt-1">{c.country}</div>
              <div className="text-sm text-gray-500">
                {c.visitCount}회 방문 · {c.cities.join(', ')} · {(c.totalSpent / 10000).toFixed(0)}만원
              </div>
            </div>
          );
        })()}
      </div>

      {/* Continent breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(stats.continentBreakdown).map(([continent, count]) => (
          <div key={continent} className="bg-white rounded-2xl p-4 shadow-sm text-center">
            <div className="text-2xl mb-1">
              {continent === 'asia' ? '🌏' :
               continent === 'europe' ? '🏰' :
               continent === 'northAmerica' ? '🗽' :
               continent === 'southAmerica' ? '💃' :
               continent === 'africa' ? '🦁' : '🦘'}
            </div>
            <div className="font-bold text-gray-800">
              {CONTINENT_LABELS[continent as keyof typeof CONTINENT_LABELS]}
            </div>
            <div className="text-sm text-gray-500">{count}개국</div>
          </div>
        ))}
      </div>

      {/* Countries by continent */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4">대륙별 방문 국가</h3>
        {Object.entries(
          countries.reduce((acc, c) => {
            const cont = CONTINENT_LABELS[c.continent];
            if (!acc[cont]) acc[cont] = [];
            acc[cont].push(c);
            return acc;
          }, {} as Record<string, typeof countries>)
        ).map(([continent, list]) => (
          <div key={continent} className="mb-4 last:mb-0">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">{continent}</h4>
            <div className="flex flex-wrap gap-2">
              {list.map(c => (
                <span key={c.countryCode}
                  className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                  {c.flag} {c.country}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
