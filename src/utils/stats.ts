import type {
  Trip, TravelStats, CountryVisit, Badge, TripCategory,
  Continent,
} from '../types';
import { COUNTRY_CONTINENT, getFlagEmoji } from '../types';

export function computeCountryVisits(trips: Trip[]): CountryVisit[] {
  const map = new Map<string, CountryVisit>();

  for (const trip of trips) {
    const existing = map.get(trip.countryCode);
    if (existing) {
      existing.visitCount++;
      if (!existing.cities.includes(trip.city)) existing.cities.push(trip.city);
      if (trip.startDate < existing.firstVisit) existing.firstVisit = trip.startDate;
      if (trip.startDate > existing.lastVisit) existing.lastVisit = trip.startDate;
      existing.totalSpent += trip.cost;
    } else {
      map.set(trip.countryCode, {
        countryCode: trip.countryCode,
        country: trip.country,
        flag: getFlagEmoji(trip.countryCode),
        visitCount: 1,
        cities: [trip.city],
        firstVisit: trip.startDate,
        lastVisit: trip.startDate,
        totalSpent: trip.cost,
        continent: COUNTRY_CONTINENT[trip.countryCode] || 'asia',
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.visitCount - a.visitCount);
}

function getSeason(dateStr: string): string {
  const month = new Date(dateStr).getMonth() + 1;
  if (month >= 3 && month <= 5) return '봄';
  if (month >= 6 && month <= 8) return '여름';
  if (month >= 9 && month <= 11) return '가을';
  return '겨울';
}

export function computeStats(trips: Trip[]): TravelStats {
  const countries = computeCountryVisits(trips);
  const continents = new Set(countries.map(c => c.continent));

  // Total days: group by overlapping date ranges per trip "group"
  const dateRanges = new Set<string>();
  for (const trip of trips) {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dateRanges.add(d.toISOString().split('T')[0]);
    }
  }

  const categoryBreakdown = {} as Record<TripCategory, { count: number; spent: number }>;
  for (const cat of ['flight', 'hotel', 'tour', 'transport', 'activity'] as TripCategory[]) {
    categoryBreakdown[cat] = { count: 0, spent: 0 };
  }
  for (const trip of trips) {
    categoryBreakdown[trip.category].count++;
    categoryBreakdown[trip.category].spent += trip.cost;
  }

  const continentBreakdown = {} as Record<Continent, number>;
  for (const c of countries) {
    continentBreakdown[c.continent] = (continentBreakdown[c.continent] || 0) + 1;
  }

  // Season count
  const seasonCount: Record<string, number> = {};
  for (const trip of trips) {
    const s = getSeason(trip.startDate);
    seasonCount[s] = (seasonCount[s] || 0) + 1;
  }
  const favoriteSeason = Object.entries(seasonCount)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '봄';

  // Yearly trips (unique trip groups by startDate year)
  const yearSet = new Map<number, Set<string>>();
  for (const trip of trips) {
    const year = new Date(trip.startDate).getFullYear();
    if (!yearSet.has(year)) yearSet.set(year, new Set());
    yearSet.get(year)!.add(`${trip.countryCode}-${trip.startDate}`);
  }
  const yearlyTrips = Array.from(yearSet.entries())
    .map(([year, s]) => ({ year, count: s.size }))
    .sort((a, b) => a.year - b.year);

  // Monthly spending
  const monthMap = new Map<string, number>();
  for (const trip of trips) {
    const key = trip.startDate.slice(0, 7); // YYYY-MM
    monthMap.set(key, (monthMap.get(key) || 0) + trip.cost);
  }
  const monthlySpending = Array.from(monthMap.entries())
    .map(([month, amount]) => ({ month, amount }))
    .sort((a, b) => a.month.localeCompare(b.month));

  return {
    totalTrips: trips.length,
    totalCountries: countries.length,
    totalContinents: continents.size,
    totalDays: dateRanges.size,
    totalSpent: trips.reduce((s, t) => s + t.cost, 0),
    mostVisitedCountry: countries[0]?.country || '-',
    favoriteSeason,
    categoryBreakdown,
    continentBreakdown,
    yearlyTrips,
    monthlySpending,
  };
}

export function computeBadges(trips: Trip[], stats: TravelStats): Badge[] {
  const countries = computeCountryVisits(trips);
  const continents = new Set(countries.map(c => c.continent));

  const badges: Badge[] = [
    {
      id: 'first-trip', title: '첫 발걸음', description: '첫 여행을 떠나다',
      icon: '👶', unlocked: trips.length > 0,
      unlockedDate: trips.length > 0 ? trips.sort((a, b) => a.startDate.localeCompare(b.startDate))[0].startDate : undefined,
    },
    {
      id: 'countries-3', title: '세계 탐험가', description: '3개국 이상 방문',
      icon: '🌍', unlocked: stats.totalCountries >= 3,
    },
    {
      id: 'countries-5', title: '글로벌 트래블러', description: '5개국 이상 방문',
      icon: '✈️', unlocked: stats.totalCountries >= 5,
    },
    {
      id: 'countries-10', title: '세계 시민', description: '10개국 이상 방문',
      icon: '🌐', unlocked: stats.totalCountries >= 10,
    },
    {
      id: 'continents-2', title: '대륙 횡단', description: '2개 대륙 방문',
      icon: '🗺️', unlocked: continents.size >= 2,
    },
    {
      id: 'continents-3', title: '대륙 정복자', description: '3개 대륙 방문',
      icon: '🏆', unlocked: continents.size >= 3,
    },
    {
      id: 'continents-all', title: '지구 마스터', description: '모든 대륙 방문',
      icon: '🌎', unlocked: continents.size >= 6,
    },
    {
      id: 'japan-lover', title: '일본 덕후', description: '일본 3회 이상 방문',
      icon: '🇯🇵', unlocked: (countries.find(c => c.countryCode === 'JPN')?.visitCount || 0) >= 3,
    },
    {
      id: 'europe-explorer', title: '유럽 여행자', description: '유럽 국가 2개 이상 방문',
      icon: '🏰', unlocked: countries.filter(c => c.continent === 'europe').length >= 2,
    },
    {
      id: 'big-spender', title: '통큰 여행자', description: '총 여행 경비 500만원 이상',
      icon: '💰', unlocked: stats.totalSpent >= 5000000,
    },
    {
      id: 'mega-spender', title: '럭셔리 트래블러', description: '총 여행 경비 1000만원 이상',
      icon: '💎', unlocked: stats.totalSpent >= 10000000,
    },
    {
      id: 'long-traveler', title: '장기 여행자', description: '총 여행 일수 30일 이상',
      icon: '🏕️', unlocked: stats.totalDays >= 30,
    },
    {
      id: 'activity-lover', title: '액티비티 마니아', description: '액티비티/투어 5회 이상',
      icon: '🎢', unlocked: (stats.categoryBreakdown.tour?.count || 0) + (stats.categoryBreakdown.activity?.count || 0) >= 5,
    },
    {
      id: 'sea-lover', title: '동남아 러버', description: '동남아 3개국 이상 방문',
      icon: '🏖️', unlocked: countries.filter(c => ['THA', 'VNM', 'SGP', 'PHL', 'IDN', 'MYS', 'KHM', 'MMR', 'LAO'].includes(c.countryCode)).length >= 3,
    },
    {
      id: 'oceania', title: '오세아니아 진출', description: '호주 또는 뉴질랜드 방문',
      icon: '🦘', unlocked: countries.some(c => c.continent === 'oceania'),
    },
  ];

  return badges;
}
