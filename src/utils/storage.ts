import type { Trip } from '../types';
import { sampleTrips } from '../data/sampleTrips';

const STORAGE_KEY = 'travel-recap-trips';

export function loadTrips(): Trip[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Trip[];
  } catch {
    return [];
  }
}

export function saveTrips(trips: Trip[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
}

export function addTrip(trip: Trip): Trip[] {
  const trips = loadTrips();
  trips.push(trip);
  saveTrips(trips);
  return trips;
}

export function updateTrip(updated: Trip): Trip[] {
  const trips = loadTrips().map(t => t.id === updated.id ? updated : t);
  saveTrips(trips);
  return trips;
}

export function deleteTrip(id: string): Trip[] {
  const trips = loadTrips().filter(t => t.id !== id);
  saveTrips(trips);
  return trips;
}

export function loadSampleData(): Trip[] {
  saveTrips(sampleTrips);
  return sampleTrips;
}

export function clearAllData(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
