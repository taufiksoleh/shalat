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
    <div className="w-full mb-4">
      {/* iOS-style grouped list header */}
      <div className="px-1 mb-2">
        <span className="text-[13px] text-[var(--ios-gray-6)] font-semibold uppercase tracking-wide">
          Lokasi
        </span>
      </div>

      {/* iOS-style picker card */}
      <div className="relative bg-white dark:bg-[var(--ios-gray)] rounded-[16px] ios-shadow-sm overflow-hidden">
        <div className="flex items-center px-4 py-3">
          {/* Location icon */}
          <svg
            className="w-6 h-6 text-[var(--ios-blue)] flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>

          {/* Select element */}
          <select
            value={selectedCity.name}
            onChange={(e) => {
              const city = indonesianCities.find((c) => c.name === e.target.value);
              if (city) onCityChange(city);
            }}
            className="flex-1 mx-3 bg-transparent border-0 text-[17px] font-medium
                     text-[var(--foreground)] focus:outline-none cursor-pointer
                     appearance-none leading-[22px] tracking-[-0.408px]"
          >
            {indonesianCities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <svg
            className="w-5 h-5 text-[var(--ios-gray-4)] flex-shrink-0 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>

        {/* iOS-style separator */}
        <div className="absolute bottom-0 left-14 right-0 h-[0.5px] bg-[var(--ios-separator)]" />
      </div>
    </div>
  );
}
