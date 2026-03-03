import { useTrips } from '../context/TripContext';
import { CATEGORY_ICONS, getFlagEmoji } from '../types';

interface TripGroup {
  key: string;
  country: string;
  countryCode: string;
  city: string;
  startDate: string;
  endDate: string;
  items: typeof trips;
  totalCost: number;
}

let trips: ReturnType<typeof useTrips>['trips'];

function groupTrips(rawTrips: typeof trips): TripGroup[] {
  const groups = new Map<string, TripGroup>();

  // Sort by date first
  const sorted = [...rawTrips].sort((a, b) => a.startDate.localeCompare(b.startDate));

  for (const trip of sorted) {
    // Group by country + overlapping date range
    const key = `${trip.countryCode}-${trip.startDate.slice(0, 7)}`;
    const existing = groups.get(key);
    if (existing) {
      existing.items.push(trip);
      if (trip.endDate > existing.endDate) existing.endDate = trip.endDate;
      if (trip.startDate < existing.startDate) existing.startDate = trip.startDate;
      if (!existing.city.includes(trip.city)) {
        existing.city += `, ${trip.city}`;
      }
      existing.totalCost += trip.cost;
    } else {
      groups.set(key, {
        key,
        country: trip.country,
        countryCode: trip.countryCode,
        city: trip.city,
        startDate: trip.startDate,
        endDate: trip.endDate,
        items: [trip],
        totalCost: trip.cost,
      });
    }
  }

  return Array.from(groups.values()).sort((a, b) => b.startDate.localeCompare(a.startDate));
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sy = s.getFullYear();
  const sm = s.getMonth() + 1;
  const sd = s.getDate();
  const em = e.getMonth() + 1;
  const ed = e.getDate();

  if (start === end) return `${sy}.${sm}.${sd}`;
  if (sm === em) return `${sy}.${sm}.${sd} - ${ed}`;
  return `${sy}.${sm}.${sd} - ${em}.${ed}`;
}

function daysBetween(a: string, b: string): number {
  return Math.max(1, Math.ceil((new Date(b).getTime() - new Date(a).getTime()) / 86400000));
}

export default function Timeline() {
  const ctx = useTrips();
  trips = ctx.trips;
  const groups = groupTrips(ctx.trips);

  if (groups.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">📅</span>
        <h2 className="text-xl font-bold text-gray-800">아직 여행 기록이 없어요</h2>
        <p className="text-gray-500 mt-2">여행을 추가하면 타임라인이 만들어져요!</p>
      </div>
    );
  }

  let currentYear = 0;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">여행 타임라인 📅</h2>
      <p className="text-gray-500 mb-6">{groups.length}개의 여행 기록</p>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-5 md:left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {groups.map((group) => {
            const year = new Date(group.startDate).getFullYear();
            const showYear = year !== currentYear;
            currentYear = year;
            const days = daysBetween(group.startDate, group.endDate);

            return (
              <div key={group.key}>
                {showYear && (
                  <div className="relative flex items-center mb-4 ml-0">
                    <div className="w-10 md:w-16 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm z-10">
                      {year}
                    </div>
                  </div>
                )}
                <div className="relative flex gap-4 ml-0">
                  {/* Dot */}
                  <div className="w-10 md:w-16 flex-shrink-0 flex justify-center">
                    <div className="w-3 h-3 rounded-full bg-accent border-2 border-white shadow z-10 mt-2" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getFlagEmoji(group.countryCode)}</span>
                        <div>
                          <div className="font-bold text-gray-800">
                            {group.country} · {group.city}
                          </div>
                          <div className="text-xs text-gray-400">
                            {formatDateRange(group.startDate, group.endDate)} · {days}일
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-accent">
                        {(group.totalCost / 10000).toFixed(0)}만원
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-1.5 mt-3">
                      {group.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{CATEGORY_ICONS[item.category]}</span>
                          <span className="flex-1 truncate">{item.title}</span>
                          <span className="text-xs text-gray-400 whitespace-nowrap">
                            {item.cost.toLocaleString()}원
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
