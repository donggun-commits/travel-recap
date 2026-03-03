import { useTrips } from '../context/TripContext';

const STAMP_COLORS = [
  { border: '#c0392b', text: '#c0392b' },
  { border: '#2980b9', text: '#2980b9' },
  { border: '#27ae60', text: '#27ae60' },
  { border: '#8e44ad', text: '#8e44ad' },
  { border: '#d35400', text: '#d35400' },
  { border: '#2c3e50', text: '#2c3e50' },
];

const STAMP_SHAPES = [
  'rounded-full',
  'rounded-xl',
  'rounded-lg',
  'rounded-3xl',
  'rounded-sm',
];

function formatStampDate(dateStr: string): string {
  const d = new Date(dateStr);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

export default function Passport() {
  const { countries, trips } = useTrips();

  if (countries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">📕</span>
        <h2 className="text-xl font-bold text-gray-800">여권이 비어있어요</h2>
        <p className="text-gray-500 mt-2">여행을 추가하면 여권 도장이 찍혀요!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">나의 여권 📕</h2>
      <p className="text-gray-500 mb-6">{countries.length}개국 방문 · {trips.length}개 예약</p>

      {/* Passport book */}
      <div className="bg-[#1a2744] rounded-2xl p-6 md:p-10 mb-6 shadow-lg">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌏</div>
          <div className="text-yellow-400 text-xs tracking-[0.3em] font-semibold uppercase">
            TRAVEL PASSPORT
          </div>
          <div className="text-white/50 text-xs mt-1">여행 리캡 · Travel Recap</div>
        </div>

        {/* Passport pages */}
        <div className="bg-[#f5f0e6] rounded-xl p-4 md:p-8 min-h-[400px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country, idx) => {
              const color = STAMP_COLORS[idx % STAMP_COLORS.length];
              const shape = STAMP_SHAPES[idx % STAMP_SHAPES.length];
              const rotation = ((idx * 37 + 7) % 25) - 12; // -12 to +12 degrees
              const isCircle = shape === 'rounded-full';

              return (
                <div
                  key={country.countryCode}
                  className="stamp-animation flex items-center justify-center"
                  style={{
                    '--stamp-rotate': `${rotation}deg`,
                    animationDelay: `${idx * 0.1}s`,
                    opacity: 0,
                  } as React.CSSProperties}
                >
                  <div
                    className={`${shape} border-[3px] border-double p-3 md:p-4 text-center ${
                      isCircle ? 'w-32 h-32 md:w-36 md:h-36' : 'w-32 md:w-36'
                    } flex flex-col items-center justify-center`}
                    style={{
                      borderColor: color.border,
                      color: color.text,
                      transform: `rotate(${rotation}deg)`,
                      opacity: 0.85,
                    }}
                  >
                    <span className="text-2xl md:text-3xl mb-1">{country.flag}</span>
                    <div className="font-bold text-xs md:text-sm leading-tight">
                      {country.country}
                    </div>
                    <div className="text-[10px] md:text-xs mt-1 opacity-70">
                      {country.cities[0]}
                    </div>
                    <div className="text-[9px] md:text-[10px] mt-1 opacity-60 font-mono">
                      {formatStampDate(country.firstVisit)}
                    </div>
                    {country.visitCount > 1 && (
                      <div className="text-[9px] mt-0.5 font-bold opacity-80">
                        ×{country.visitCount}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Country details */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4">방문 이력 상세</h3>
        <div className="space-y-4">
          {countries.map((c) => (
            <div key={c.countryCode} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
              <span className="text-3xl">{c.flag}</span>
              <div className="flex-1">
                <div className="font-bold text-gray-800">{c.country}</div>
                <div className="text-sm text-gray-500">
                  방문 도시: {c.cities.join(', ')}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  첫 방문: {formatStampDate(c.firstVisit)}
                  {c.visitCount > 1 && ` · 마지막: ${formatStampDate(c.lastVisit)}`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-primary">{c.visitCount}회</div>
                <div className="text-xs text-gray-400">
                  {(c.totalSpent / 10000).toFixed(0)}만원
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
