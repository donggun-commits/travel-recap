import { useTrips } from '../context/TripContext';
import { CATEGORY_LABELS, CATEGORY_ICONS, CONTINENT_LABELS } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#1e3a5f', '#2d5a8e', '#e67e22', '#27ae60', '#8e44ad', '#c0392b'];

function formatKRW(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(0)}만원`;
  return `${n.toLocaleString()}원`;
}

export default function Dashboard() {
  const { trips, stats, countries, importSampleData } = useTrips();

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">🌏</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">아직 여행 기록이 없어요</h2>
        <p className="text-gray-500 mb-6">샘플 데이터를 불러와서 체험해보세요!</p>
        <button
          onClick={importSampleData}
          className="bg-accent text-white px-6 py-3 rounded-xl font-semibold hover:bg-accent-light transition-colors"
        >
          ✨ 샘플 여행 데이터 불러오기
        </button>
      </div>
    );
  }

  const categoryData = Object.entries(stats.categoryBreakdown)
    .filter(([, v]) => v.count > 0)
    .map(([key, v]) => ({
      name: `${CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS]} ${CATEGORY_LABELS[key as keyof typeof CATEGORY_LABELS]}`,
      count: v.count,
      spent: v.spent,
    }));

  const continentData = Object.entries(stats.continentBreakdown)
    .map(([key, count]) => ({
      name: CONTINENT_LABELS[key as keyof typeof CONTINENT_LABELS],
      value: count,
    }));

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">나의 여행 리캡 ✈️</h2>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon="🗓️" label="총 여행 일수" value={`${stats.totalDays}일`} />
        <StatCard icon="🌍" label="방문 국가" value={`${stats.totalCountries}개국`} />
        <StatCard icon="🌏" label="방문 대륙" value={`${stats.totalContinents}개`} />
        <StatCard icon="💰" label="총 지출" value={formatKRW(stats.totalSpent)} />
        <StatCard icon="❤️" label="최다 방문국" value={stats.mostVisitedCountry} />
        <StatCard icon="🌸" label="선호 시즌" value={stats.favoriteSeason} />
        <StatCard icon="📋" label="총 예약 건수" value={`${stats.totalTrips}건`} />
        <StatCard icon="🏆" label="Top 도시" value={countries[0]?.cities[0] || '-'} />
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Category breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">카테고리별 지출</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData} layout="vertical">
              <XAxis type="number" tickFormatter={(v) => formatKRW(v)} fontSize={12} />
              <YAxis type="category" dataKey="name" width={100} fontSize={12} />
              <Tooltip formatter={(v) => formatKRW(v as number)} />
              <Bar dataKey="spent" fill="#1e3a5f" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Continent pie */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-700 mb-4">대륙별 방문 국가</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={continentData} dataKey="value" nameKey="name" cx="50%" cy="50%"
                outerRadius={90} label={({ name, value }) => `${name} ${value}`} fontSize={13}>
                {continentData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly trend */}
      {stats.yearlyTrips.length > 1 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-8">
          <h3 className="font-bold text-gray-700 mb-4">연도별 여행 추이</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stats.yearlyTrips}>
              <XAxis dataKey="year" fontSize={13} />
              <YAxis allowDecimals={false} fontSize={13} />
              <Tooltip />
              <Bar dataKey="count" fill="#e67e22" radius={[6, 6, 0, 0]} name="여행 수" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Country ranking */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-700 mb-4">방문 국가 랭킹</h3>
        <div className="space-y-3">
          {countries.slice(0, 5).map((c, i) => (
            <div key={c.countryCode} className="flex items-center gap-3">
              <span className="text-lg font-bold text-gray-400 w-6">{i + 1}</span>
              <span className="text-2xl">{c.flag}</span>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{c.country}</div>
                <div className="text-xs text-gray-500">
                  {c.cities.join(', ')} · {formatKRW(c.totalSpent)}
                </div>
              </div>
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
                {c.visitCount}회
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-lg font-bold text-gray-800">{value}</div>
    </div>
  );
}
