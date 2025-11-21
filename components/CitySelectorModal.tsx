"use client";

import { useState, useMemo } from "react";
import { City } from "@/types/prayer";
import { indonesianCities } from "@/lib/indonesian-cities";

interface CitySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (city: City) => void;
  selectedCity: City;
}

export default function CitySelectorModal({
  isOpen,
  onClose,
  onSelectCity,
  selectedCity,
}: CitySelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) return indonesianCities;
    return indonesianCities.filter((city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectCity = (city: City) => {
    onSelectCity(city);
    onClose();
    setSearchQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md max-h-[85vh] overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Pilih Kota</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-gray-100 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* City List */}
        <div className="overflow-y-auto max-h-[60vh] px-3 py-3">
          {filteredCities.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-gray-500">Kota tidak ditemukan</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCities.map((city) => {
                const isSelected = city.name === selectedCity.name;
                return (
                  <button
                    key={city.name}
                    onClick={() => handleSelectCity(city)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                      isSelected
                        ? "bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
                        isSelected
                          ? "bg-primary-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {isSelected ? "✓" : "📍"}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-semibold ${isSelected ? "text-primary-700" : "text-gray-900"}`}>
                        {city.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {city.latitude.toFixed(4)}, {city.longitude.toFixed(4)}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4">
          <p className="text-center text-xs text-gray-400">
            {indonesianCities.length} kota tersedia di Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
