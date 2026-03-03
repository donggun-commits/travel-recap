export type TripCategory = 'flight' | 'hotel' | 'tour' | 'transport' | 'activity';

export interface Trip {
  id: string;
  title: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-3
  city: string;
  category: TripCategory;
  startDate: string; // YYYY-MM-DD
  endDate: string;
  cost: number; // KRW
  notes?: string;
  platform: 'myrealtrip' | 'manual';
}

export interface CountryVisit {
  countryCode: string;
  country: string;
  flag: string;
  visitCount: number;
  cities: string[];
  firstVisit: string;
  lastVisit: string;
  totalSpent: number;
  continent: Continent;
}

export type Continent = 'asia' | 'europe' | 'northAmerica' | 'southAmerica' | 'africa' | 'oceania';

export const CONTINENT_LABELS: Record<Continent, string> = {
  asia: '아시아',
  europe: '유럽',
  northAmerica: '북미',
  southAmerica: '남미',
  africa: '아프리카',
  oceania: '오세아니아',
};

export const CATEGORY_LABELS: Record<TripCategory, string> = {
  flight: '항공권',
  hotel: '숙소',
  tour: '투어/티켓',
  transport: '교통',
  activity: '액티비티',
};

export const CATEGORY_ICONS: Record<TripCategory, string> = {
  flight: '✈️',
  hotel: '🏨',
  tour: '🎫',
  transport: '🚗',
  activity: '🎿',
};

export interface TravelStats {
  totalTrips: number;
  totalCountries: number;
  totalContinents: number;
  totalDays: number;
  totalSpent: number;
  mostVisitedCountry: string;
  favoriteSeason: string;
  categoryBreakdown: Record<TripCategory, { count: number; spent: number }>;
  continentBreakdown: Record<Continent, number>;
  yearlyTrips: { year: number; count: number }[];
  monthlySpending: { month: string; amount: number }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
}

// Country to continent mapping
export const COUNTRY_CONTINENT: Record<string, Continent> = {
  JPN: 'asia', KOR: 'asia', THA: 'asia', VNM: 'asia', SGP: 'asia',
  TWN: 'asia', PHL: 'asia', IDN: 'asia', MYS: 'asia', KHM: 'asia',
  MMR: 'asia', LAO: 'asia', IND: 'asia', NPL: 'asia', LKA: 'asia',
  CHN: 'asia', HKG: 'asia', MAC: 'asia', MNG: 'asia', UZB: 'asia',
  TUR: 'asia', GEO: 'asia', ARE: 'asia', QAT: 'asia', MDV: 'asia',
  FRA: 'europe', GBR: 'europe', DEU: 'europe', ITA: 'europe', ESP: 'europe',
  PRT: 'europe', CHE: 'europe', AUT: 'europe', CZE: 'europe', HUN: 'europe',
  POL: 'europe', NLD: 'europe', BEL: 'europe', GRC: 'europe', HRV: 'europe',
  ISL: 'europe', NOR: 'europe', SWE: 'europe', FIN: 'europe', DNK: 'europe',
  IRL: 'europe', ROU: 'europe', BGR: 'europe', SVN: 'europe', EST: 'europe',
  USA: 'northAmerica', CAN: 'northAmerica', MEX: 'northAmerica',
  BRA: 'southAmerica', ARG: 'southAmerica', CHL: 'southAmerica',
  PER: 'southAmerica', COL: 'southAmerica', BOL: 'southAmerica', CUB: 'southAmerica',
  EGY: 'africa', MAR: 'africa', ZAF: 'africa', KEN: 'africa', TZA: 'africa',
  ETH: 'africa',
  AUS: 'oceania', NZL: 'oceania', FJI: 'oceania', GUM: 'oceania',
};

// Country code to flag emoji
export function getFlagEmoji(countryCode: string): string {
  const FLAGS: Record<string, string> = {
    JPN: '🇯🇵', KOR: '🇰🇷', THA: '🇹🇭', VNM: '🇻🇳', SGP: '🇸🇬',
    TWN: '🇹🇼', PHL: '🇵🇭', IDN: '🇮🇩', MYS: '🇲🇾', KHM: '🇰🇭',
    MMR: '🇲🇲', LAO: '🇱🇦', IND: '🇮🇳', NPL: '🇳🇵', LKA: '🇱🇰',
    CHN: '🇨🇳', HKG: '🇭🇰', MAC: '🇲🇴', MNG: '🇲🇳', UZB: '🇺🇿',
    TUR: '🇹🇷', GEO: '🇬🇪', ARE: '🇦🇪', QAT: '🇶🇦', MDV: '🇲🇻',
    FRA: '🇫🇷', GBR: '🇬🇧', DEU: '🇩🇪', ITA: '🇮🇹', ESP: '🇪🇸',
    PRT: '🇵🇹', CHE: '🇨🇭', AUT: '🇦🇹', CZE: '🇨🇿', HUN: '🇭🇺',
    POL: '🇵🇱', NLD: '🇳🇱', BEL: '🇧🇪', GRC: '🇬🇷', HRV: '🇭🇷',
    ISL: '🇮🇸', NOR: '🇳🇴', SWE: '🇸🇪', FIN: '🇫🇮', DNK: '🇩🇰',
    IRL: '🇮🇪', ROU: '🇷🇴', BGR: '🇧🇬', SVN: '🇸🇮', EST: '🇪🇪',
    USA: '🇺🇸', CAN: '🇨🇦', MEX: '🇲🇽',
    BRA: '🇧🇷', ARG: '🇦🇷', CHL: '🇨🇱', PER: '🇵🇪', COL: '🇨🇴',
    BOL: '🇧🇴', CUB: '🇨🇺',
    EGY: '🇪🇬', MAR: '🇲🇦', ZAF: '🇿🇦', KEN: '🇰🇪', TZA: '🇹🇿',
    ETH: '🇪🇹',
    AUS: '🇦🇺', NZL: '🇳🇿', FJI: '🇫🇯', GUM: '🇬🇺',
  };
  return FLAGS[countryCode] || '🏳️';
}
