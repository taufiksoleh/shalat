"use client";

import { City } from "@/types/prayer";
import { indonesianCities } from "@/lib/indonesian-cities";

interface LocationSelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export default function LocationSelector({
  selectedCity,
  onCityChange,
}: LocationSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <select
          value={selectedCity.name}
          onChange={(e) => {
            const city = indonesianCities.find((c) => c.name === e.target.value);
            if (city) onCityChange(city);
          }}
          className="w-full pl-11 pr-4 py-3 bg-white border-2 border-emerald-200 rounded-2xl
                   text-gray-800 font-medium shadow-sm focus:outline-none focus:ring-2
                   focus:ring-emerald-500 focus:border-transparent transition-all cursor-pointer
                   appearance-none text-center"
        >
          {indonesianCities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}
