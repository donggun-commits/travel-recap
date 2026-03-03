import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Trip, TravelStats, CountryVisit, Badge } from '../types';
import { loadTrips, saveTrips, loadSampleData, generateId } from '../utils/storage';
import { computeStats, computeCountryVisits, computeBadges } from '../utils/stats';

interface TripContextValue {
  trips: Trip[];
  stats: TravelStats;
  countries: CountryVisit[];
  badges: Badge[];
  addTrip: (trip: Omit<Trip, 'id'>) => void;
  updateTrip: (trip: Trip) => void;
  deleteTrip: (id: string) => void;
  importSampleData: () => void;
  clearAll: () => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(() => loadTrips());

  const stats = computeStats(trips);
  const countries = computeCountryVisits(trips);
  const badges = computeBadges(trips, stats);

  useEffect(() => {
    saveTrips(trips);
  }, [trips]);

  const value: TripContextValue = {
    trips,
    stats,
    countries,
    badges,
    addTrip: (data) => {
      const trip: Trip = { ...data, id: generateId() };
      setTrips(prev => [...prev, trip]);
    },
    updateTrip: (updated) => {
      setTrips(prev => prev.map(t => t.id === updated.id ? updated : t));
    },
    deleteTrip: (id) => {
      setTrips(prev => prev.filter(t => t.id !== id));
    },
    importSampleData: () => {
      const sample = loadSampleData();
      setTrips(sample);
    },
    clearAll: () => {
      setTrips([]);
      saveTrips([]);
    },
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error('useTrips must be used within TripProvider');
  return ctx;
}
