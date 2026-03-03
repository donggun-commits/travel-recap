import type { ReactNode } from 'react';

const navItems = [
  { to: 'dashboard', icon: '📊', label: '대시보드' },
  { to: 'passport', icon: '📕', label: '여권' },
  { to: 'map', icon: '🗺️', label: '지도' },
  { to: 'timeline', icon: '📅', label: '타임라인' },
  { to: 'badges', icon: '🏅', label: '배지' },
  { to: 'trips', icon: '✈️', label: '여행관리' },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <aside className="w-56 bg-primary text-white min-h-screen fixed left-0 top-0 flex flex-col py-6 px-3 z-50">
          <h1 className="text-xl font-bold px-3 mb-8 flex items-center gap-2">
            🌏 여행 리캡
          </h1>
          <nav className="flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.to}
                onClick={() => scrollTo(item.to)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-white/70 hover:bg-white/10 hover:text-white text-left"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
        <main className="ml-56 flex-1 p-6 min-h-screen">
          {children}
        </main>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col min-h-screen">
        <header className="bg-primary text-white px-4 py-3 flex items-center gap-2 sticky top-0 z-50">
          <span className="text-xl">🌏</span>
          <h1 className="text-lg font-bold">여행 리캡</h1>
        </header>
        <main className="flex-1 p-4 pb-20">
          {children}
        </main>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50">
          {navItems.map(item => (
            <button
              key={item.to}
              onClick={() => scrollTo(item.to)}
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-xs text-gray-400 hover:text-primary"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
