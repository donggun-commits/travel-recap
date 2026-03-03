import { useTrips } from '../context/TripContext';

export default function Badges() {
  const { badges, trips } = useTrips();

  const unlocked = badges.filter(b => b.unlocked);
  const locked = badges.filter(b => !b.unlocked);

  if (trips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <span className="text-6xl mb-4">🏅</span>
        <h2 className="text-xl font-bold text-gray-800">아직 배지가 없어요</h2>
        <p className="text-gray-500 mt-2">여행을 다니며 배지를 모아보세요!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">여행 배지 🏅</h2>
      <p className="text-gray-500 mb-6">
        {unlocked.length}/{badges.length}개 달성
      </p>

      {/* Progress bar */}
      <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-sm font-semibold text-gray-700">달성률</div>
          <div className="text-sm text-accent font-bold">
            {Math.round((unlocked.length / badges.length) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-accent to-accent-light h-3 rounded-full transition-all duration-700"
            style={{ width: `${(unlocked.length / badges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Unlocked badges */}
      {unlocked.length > 0 && (
        <div className="mb-8">
          <h3 className="font-bold text-gray-700 mb-4">획득한 배지</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {unlocked.map((badge) => (
              <div
                key={badge.id}
                className="bg-white rounded-2xl p-5 shadow-sm text-center hover:shadow-md transition-shadow border-2 border-accent/20"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-bold text-gray-800 text-sm">{badge.title}</div>
                <div className="text-xs text-gray-500 mt-1">{badge.description}</div>
                {badge.unlockedDate && (
                  <div className="text-[10px] text-accent mt-2 font-medium">
                    {new Date(badge.unlockedDate).toLocaleDateString('ko-KR')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked badges */}
      {locked.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-700 mb-4">미획득 배지</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locked.map((badge) => (
              <div
                key={badge.id}
                className="bg-gray-50 rounded-2xl p-5 text-center opacity-50"
              >
                <div className="text-4xl mb-2 grayscale">🔒</div>
                <div className="font-bold text-gray-500 text-sm">{badge.title}</div>
                <div className="text-xs text-gray-400 mt-1">{badge.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
