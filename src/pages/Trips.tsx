import { useState } from 'react';
import { useTrips } from '../context/TripContext';
import type { TripCategory } from '../types';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '../types';

const COUNTRY_OPTIONS = [
  { code: 'JPN', name: '일본', cities: ['도쿄', '오사카', '교토', '후쿠오카', '삿포로', '나고야', '오키나와'] },
  { code: 'THA', name: '태국', cities: ['방콕', '치앙마이', '푸켓', '파타야', '끄라비'] },
  { code: 'VNM', name: '베트남', cities: ['다낭', '호치민', '하노이', '나트랑', '호이안'] },
  { code: 'SGP', name: '싱가포르', cities: ['싱가포르'] },
  { code: 'TWN', name: '대만', cities: ['타이베이', '가오슝', '타이중'] },
  { code: 'PHL', name: '필리핀', cities: ['마닐라', '세부', '보라카이'] },
  { code: 'IDN', name: '인도네시아', cities: ['발리', '자카르타', '족자카르타'] },
  { code: 'MYS', name: '말레이시아', cities: ['쿠알라룸푸르', '코타키나발루', '랑카위'] },
  { code: 'FRA', name: '프랑스', cities: ['파리', '니스', '리옹', '마르세유'] },
  { code: 'GBR', name: '영국', cities: ['런던', '에든버러', '맨체스터'] },
  { code: 'DEU', name: '독일', cities: ['베를린', '뮌헨', '프랑크푸르트'] },
  { code: 'ITA', name: '이탈리아', cities: ['로마', '피렌체', '베네치아', '밀라노', '나폴리'] },
  { code: 'ESP', name: '스페인', cities: ['바르셀로나', '마드리드', '세비야', '그라나다'] },
  { code: 'CHE', name: '스위스', cities: ['취리히', '인터라켄', '루체른', '제네바'] },
  { code: 'USA', name: '미국', cities: ['뉴욕', 'LA', '샌프란시스코', '하와이', '라스베가스'] },
  { code: 'CAN', name: '캐나다', cities: ['밴쿠버', '토론토', '몬트리올'] },
  { code: 'AUS', name: '호주', cities: ['시드니', '멜버른', '브리즈번', '골드코스트'] },
  { code: 'NZL', name: '뉴질랜드', cities: ['오클랜드', '퀸스타운', '크라이스트처치'] },
  { code: 'TUR', name: '튀르키예', cities: ['이스탄불', '카파도키아', '안탈리아'] },
  { code: 'GRC', name: '그리스', cities: ['아테네', '산토리니', '미코노스'] },
  { code: 'HRV', name: '크로아티아', cities: ['두브로브니크', '스플리트', '자그레브'] },
  { code: 'CZE', name: '체코', cities: ['프라하', '체스키크룸로프'] },
  { code: 'MDV', name: '몰디브', cities: ['말레'] },
  { code: 'ARE', name: 'UAE', cities: ['두바이', '아부다비'] },
];

const emptyForm = {
  title: '',
  countryCode: '',
  city: '',
  category: 'flight' as TripCategory,
  startDate: '',
  endDate: '',
  cost: 0,
  notes: '',
};

export default function Trips() {
  const { trips, addTrip, deleteTrip, importSampleData, clearAll } = useTrips();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [sortBy, setSortBy] = useState<'date' | 'cost'>('date');

  const selectedCountry = COUNTRY_OPTIONS.find(c => c.code === form.countryCode);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const country = COUNTRY_OPTIONS.find(c => c.code === form.countryCode);
    if (!country || !form.city || !form.startDate || !form.endDate) return;

    addTrip({
      title: form.title || `${country.name} ${form.city} ${CATEGORY_LABELS[form.category]}`,
      country: country.name,
      countryCode: form.countryCode,
      city: form.city,
      category: form.category,
      startDate: form.startDate,
      endDate: form.endDate,
      cost: form.cost,
      notes: form.notes,
      platform: 'manual',
    });

    setForm(emptyForm);
    setShowForm(false);
  }

  const sorted = [...trips].sort((a, b) =>
    sortBy === 'date'
      ? b.startDate.localeCompare(a.startDate)
      : b.cost - a.cost
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">여행 관리 ✈️</h2>
          <p className="text-gray-500 text-sm">{trips.length}개의 예약 기록</p>
        </div>
        <div className="flex gap-2">
          {trips.length === 0 && (
            <button
              onClick={importSampleData}
              className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-light transition-colors"
            >
              ✨ 샘플 데이터
            </button>
          )}
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors"
          >
            {showForm ? '취소' : '+ 추가'}
          </button>
        </div>
      </div>

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="font-bold text-gray-700 mb-4">새 여행 추가</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">국가</label>
              <select
                value={form.countryCode}
                onChange={e => setForm({ ...form, countryCode: e.target.value, city: '' })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                required
              >
                <option value="">국가 선택</option>
                {COUNTRY_OPTIONS.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">도시</label>
              <select
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                required
                disabled={!form.countryCode}
              >
                <option value="">도시 선택</option>
                {selectedCountry?.cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">카테고리</label>
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value as TripCategory })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {CATEGORY_ICONS[key as TripCategory]} {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">비용 (원)</label>
              <input
                type="number"
                value={form.cost || ''}
                onChange={e => setForm({ ...form, cost: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">시작일</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value, endDate: form.endDate || e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">종료일</label>
              <input
                type="date"
                value={form.endDate}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                required
                min={form.startDate}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600 mb-1">예약명</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="예: 인천 → 도쿄 나리타 왕복항공권"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-primary-light transition-colors"
            >
              추가하기
            </button>
          </div>
        </form>
      )}

      {/* Sort controls */}
      {trips.length > 0 && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">정렬:</span>
          <button
            onClick={() => setSortBy('date')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              sortBy === 'date' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            날짜순
          </button>
          <button
            onClick={() => setSortBy('cost')}
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              sortBy === 'cost' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            금액순
          </button>
          <div className="flex-1" />
          <button
            onClick={() => { if (confirm('모든 데이터를 삭제할까요?')) clearAll(); }}
            className="text-xs text-red-400 hover:text-red-600"
          >
            전체 삭제
          </button>
        </div>
      )}

      {/* Trip list */}
      <div className="space-y-2">
        {sorted.map((trip) => (
          <div key={trip.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
            <span className="text-xl">{CATEGORY_ICONS[trip.category]}</span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-gray-800 text-sm truncate">{trip.title}</div>
              <div className="text-xs text-gray-400">
                {trip.country} {trip.city} · {trip.startDate}
              </div>
            </div>
            <div className="text-sm font-bold text-gray-600 whitespace-nowrap">
              {trip.cost.toLocaleString()}원
            </div>
            <button
              onClick={() => { if (confirm('삭제할까요?')) deleteTrip(trip.id); }}
              className="text-gray-300 hover:text-red-400 text-lg"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {trips.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <span className="text-4xl block mb-3">📭</span>
          아직 등록된 여행이 없습니다
        </div>
      )}
    </div>
  );
}
