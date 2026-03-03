import type { Trip } from '../types';

export const sampleTrips: Trip[] = [
  // 2023 일본 도쿄 여행
  {
    id: '1', title: '인천 → 도쿄 나리타 왕복항공권', country: '일본', countryCode: 'JPN',
    city: '도쿄', category: 'flight', startDate: '2023-03-15', endDate: '2023-03-19',
    cost: 385000, platform: 'myrealtrip',
  },
  {
    id: '2', title: '신주쿠 도쿄 호텔 (4박)', country: '일본', countryCode: 'JPN',
    city: '도쿄', category: 'hotel', startDate: '2023-03-15', endDate: '2023-03-19',
    cost: 520000, platform: 'myrealtrip',
  },
  {
    id: '3', title: '팀랩 보더리스 입장권', country: '일본', countryCode: 'JPN',
    city: '도쿄', category: 'tour', startDate: '2023-03-16', endDate: '2023-03-16',
    cost: 38000, platform: 'myrealtrip',
  },
  // 2023 태국 방콕 + 치앙마이
  {
    id: '4', title: '인천 → 방콕 수완나품 왕복항공권', country: '태국', countryCode: 'THA',
    city: '방콕', category: 'flight', startDate: '2023-07-20', endDate: '2023-07-27',
    cost: 420000, platform: 'myrealtrip',
  },
  {
    id: '5', title: '방콕 수쿰빗 호텔 (4박)', country: '태국', countryCode: 'THA',
    city: '방콕', category: 'hotel', startDate: '2023-07-20', endDate: '2023-07-24',
    cost: 280000, platform: 'myrealtrip',
  },
  {
    id: '6', title: '치앙마이 올드타운 게스트하우스 (3박)', country: '태국', countryCode: 'THA',
    city: '치앙마이', category: 'hotel', startDate: '2023-07-24', endDate: '2023-07-27',
    cost: 150000, platform: 'myrealtrip',
  },
  {
    id: '7', title: '방콕 → 치앙마이 국내선', country: '태국', countryCode: 'THA',
    city: '치앙마이', category: 'transport', startDate: '2023-07-24', endDate: '2023-07-24',
    cost: 65000, platform: 'myrealtrip',
  },
  {
    id: '8', title: '치앙마이 코끼리 보호소 투어', country: '태국', countryCode: 'THA',
    city: '치앙마이', category: 'activity', startDate: '2023-07-25', endDate: '2023-07-25',
    cost: 55000, platform: 'myrealtrip',
  },
  // 2023 베트남 다낭
  {
    id: '9', title: '인천 → 다낭 왕복항공권', country: '베트남', countryCode: 'VNM',
    city: '다낭', category: 'flight', startDate: '2023-11-10', endDate: '2023-11-14',
    cost: 310000, platform: 'myrealtrip',
  },
  {
    id: '10', title: '다낭 미케비치 리조트 (4박)', country: '베트남', countryCode: 'VNM',
    city: '다낭', category: 'hotel', startDate: '2023-11-10', endDate: '2023-11-14',
    cost: 360000, platform: 'myrealtrip',
  },
  {
    id: '11', title: '바나힐 당일 투어', country: '베트남', countryCode: 'VNM',
    city: '다낭', category: 'tour', startDate: '2023-11-12', endDate: '2023-11-12',
    cost: 45000, platform: 'myrealtrip',
  },
  // 2024 일본 오사카
  {
    id: '12', title: '인천 → 간사이 왕복항공권', country: '일본', countryCode: 'JPN',
    city: '오사카', category: 'flight', startDate: '2024-01-05', endDate: '2024-01-09',
    cost: 295000, platform: 'myrealtrip',
  },
  {
    id: '13', title: '도톤보리 호텔 (4박)', country: '일본', countryCode: 'JPN',
    city: '오사카', category: 'hotel', startDate: '2024-01-05', endDate: '2024-01-09',
    cost: 480000, platform: 'myrealtrip',
  },
  {
    id: '14', title: '유니버설 스튜디오 재팬 1일권', country: '일본', countryCode: 'JPN',
    city: '오사카', category: 'tour', startDate: '2024-01-07', endDate: '2024-01-07',
    cost: 75000, platform: 'myrealtrip',
  },
  // 2024 프랑스 파리
  {
    id: '15', title: '인천 → 파리 샤를드골 왕복항공권', country: '프랑스', countryCode: 'FRA',
    city: '파리', category: 'flight', startDate: '2024-04-10', endDate: '2024-04-18',
    cost: 1250000, platform: 'myrealtrip',
  },
  {
    id: '16', title: '파리 마레지구 에어비앤비 (8박)', country: '프랑스', countryCode: 'FRA',
    city: '파리', category: 'hotel', startDate: '2024-04-10', endDate: '2024-04-18',
    cost: 1100000, platform: 'myrealtrip',
  },
  {
    id: '17', title: '루브르 박물관 스킵더라인 입장권', country: '프랑스', countryCode: 'FRA',
    city: '파리', category: 'tour', startDate: '2024-04-12', endDate: '2024-04-12',
    cost: 28000, platform: 'myrealtrip',
  },
  {
    id: '18', title: '베르사유 궁전 가이드 투어', country: '프랑스', countryCode: 'FRA',
    city: '파리', category: 'tour', startDate: '2024-04-14', endDate: '2024-04-14',
    cost: 65000, platform: 'myrealtrip',
  },
  // 2024 싱가포르
  {
    id: '19', title: '인천 → 싱가포르 창이 왕복항공권', country: '싱가포르', countryCode: 'SGP',
    city: '싱가포르', category: 'flight', startDate: '2024-06-15', endDate: '2024-06-19',
    cost: 480000, platform: 'myrealtrip',
  },
  {
    id: '20', title: '마리나베이 호텔 (4박)', country: '싱가포르', countryCode: 'SGP',
    city: '싱가포르', category: 'hotel', startDate: '2024-06-15', endDate: '2024-06-19',
    cost: 890000, platform: 'myrealtrip',
  },
  {
    id: '21', title: '가든스 바이 더 베이 입장권', country: '싱가포르', countryCode: 'SGP',
    city: '싱가포르', category: 'tour', startDate: '2024-06-17', endDate: '2024-06-17',
    cost: 25000, platform: 'myrealtrip',
  },
  // 2024 이탈리아 로마 + 피렌체
  {
    id: '22', title: '인천 → 로마 피우미치노 왕복항공권', country: '이탈리아', countryCode: 'ITA',
    city: '로마', category: 'flight', startDate: '2024-09-20', endDate: '2024-09-28',
    cost: 1180000, platform: 'myrealtrip',
  },
  {
    id: '23', title: '로마 트레비분수 근처 호텔 (5박)', country: '이탈리아', countryCode: 'ITA',
    city: '로마', category: 'hotel', startDate: '2024-09-20', endDate: '2024-09-25',
    cost: 750000, platform: 'myrealtrip',
  },
  {
    id: '24', title: '콜로세움 + 포로로마노 가이드 투어', country: '이탈리아', countryCode: 'ITA',
    city: '로마', category: 'tour', startDate: '2024-09-22', endDate: '2024-09-22',
    cost: 55000, platform: 'myrealtrip',
  },
  {
    id: '25', title: '로마 → 피렌체 기차 (이딸로)', country: '이탈리아', countryCode: 'ITA',
    city: '피렌체', category: 'transport', startDate: '2024-09-25', endDate: '2024-09-25',
    cost: 45000, platform: 'myrealtrip',
  },
  {
    id: '26', title: '피렌체 두오모 근처 호텔 (3박)', country: '이탈리아', countryCode: 'ITA',
    city: '피렌체', category: 'hotel', startDate: '2024-09-25', endDate: '2024-09-28',
    cost: 420000, platform: 'myrealtrip',
  },
  {
    id: '27', title: '우피치 미술관 스킵더라인', country: '이탈리아', countryCode: 'ITA',
    city: '피렌체', category: 'tour', startDate: '2024-09-26', endDate: '2024-09-26',
    cost: 32000, platform: 'myrealtrip',
  },
  // 2025 일본 후쿠오카
  {
    id: '28', title: '인천 → 후쿠오카 왕복항공권', country: '일본', countryCode: 'JPN',
    city: '후쿠오카', category: 'flight', startDate: '2025-02-14', endDate: '2025-02-17',
    cost: 215000, platform: 'myrealtrip',
  },
  {
    id: '29', title: '하카타역 호텔 (3박)', country: '일본', countryCode: 'JPN',
    city: '후쿠오카', category: 'hotel', startDate: '2025-02-14', endDate: '2025-02-17',
    cost: 310000, platform: 'myrealtrip',
  },
  // 2025 스페인 바르셀로나
  {
    id: '30', title: '인천 → 바르셀로나 왕복항공권', country: '스페인', countryCode: 'ESP',
    city: '바르셀로나', category: 'flight', startDate: '2025-05-01', endDate: '2025-05-08',
    cost: 1050000, platform: 'myrealtrip',
  },
  {
    id: '31', title: '고딕지구 부티크호텔 (7박)', country: '스페인', countryCode: 'ESP',
    city: '바르셀로나', category: 'hotel', startDate: '2025-05-01', endDate: '2025-05-08',
    cost: 980000, platform: 'myrealtrip',
  },
  {
    id: '32', title: '사그라다 파밀리아 입장권', country: '스페인', countryCode: 'ESP',
    city: '바르셀로나', category: 'tour', startDate: '2025-05-03', endDate: '2025-05-03',
    cost: 35000, platform: 'myrealtrip',
  },
  {
    id: '33', title: '몬세라트 반일 투어', country: '스페인', countryCode: 'ESP',
    city: '바르셀로나', category: 'tour', startDate: '2025-05-05', endDate: '2025-05-05',
    cost: 62000, platform: 'myrealtrip',
  },
  // 2025 호주 시드니
  {
    id: '34', title: '인천 → 시드니 왕복항공권', country: '호주', countryCode: 'AUS',
    city: '시드니', category: 'flight', startDate: '2025-08-10', endDate: '2025-08-17',
    cost: 980000, platform: 'myrealtrip',
  },
  {
    id: '35', title: '서큘러키 호텔 (7박)', country: '호주', countryCode: 'AUS',
    city: '시드니', category: 'hotel', startDate: '2025-08-10', endDate: '2025-08-17',
    cost: 1400000, platform: 'myrealtrip',
  },
  {
    id: '36', title: '시드니 하버브릿지 클라이밍', country: '호주', countryCode: 'AUS',
    city: '시드니', category: 'activity', startDate: '2025-08-12', endDate: '2025-08-12',
    cost: 180000, platform: 'myrealtrip',
  },
  {
    id: '37', title: '블루마운틴 데이투어', country: '호주', countryCode: 'AUS',
    city: '시드니', category: 'tour', startDate: '2025-08-14', endDate: '2025-08-14',
    cost: 95000, platform: 'myrealtrip',
  },
];
