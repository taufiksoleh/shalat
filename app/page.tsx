"use client";

import { useEffect, useState } from "react";
import LocationSelector from "@/components/LocationSelector";
import PrayerCard from "@/components/PrayerCard";
import { City, PrayerTimesData, NextPrayer } from "@/types/prayer";
import { indonesianCities } from "@/lib/indonesian-cities";

const prayerNames = {
  Fajr: { id: "Subuh", ar: "الفجر", icon: "🌅" },
  Dhuhr: { id: "Dzuhur", ar: "الظهر", icon: "☀️" },
  Asr: { id: "Ashar", ar: "العصر", icon: "🌤️" },
  Maghrib: { id: "Maghrib", ar: "المغرب", icon: "🌆" },
  Isha: { id: "Isya", ar: "العشاء", icon: "🌙" },
};

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(indonesianCities[0]);
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch prayer times when city changes
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/prayer-times?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}`
        );
        const data = await response.json();
        setPrayerData(data);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  // Calculate next prayer and time remaining
  useEffect(() => {
    if (!prayerData) return;

    const prayers = [
      { name: "Subuh", time: prayerData.timings.Fajr, key: "Fajr" },
      { name: "Dzuhur", time: prayerData.timings.Dhuhr, key: "Dhuhr" },
      { name: "Ashar", time: prayerData.timings.Asr, key: "Asr" },
      { name: "Maghrib", time: prayerData.timings.Maghrib, key: "Maghrib" },
      { name: "Isya", time: prayerData.timings.Isha, key: "Isha" },
    ];

    const now = currentTime;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    let next = null;
    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        const diff = prayerMinutes - currentMinutes;
        const hoursLeft = Math.floor(diff / 60);
        const minutesLeft = diff % 60;
        next = {
          name: prayer.name,
          time: prayer.time,
          remaining: `${hoursLeft} jam ${minutesLeft} menit`,
        };
        break;
      }
    }

    // If no prayer found (after Isha), next prayer is Fajr tomorrow
    if (!next) {
      const [hours, minutes] = prayers[0].time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;
      const diff = 24 * 60 - currentMinutes + prayerMinutes;
      const hoursLeft = Math.floor(diff / 60);
      const minutesLeft = diff % 60;
      next = {
        name: prayers[0].name,
        time: prayers[0].time,
        remaining: `${hoursLeft} jam ${minutesLeft} menit`,
      };
    }

    setNextPrayer(next);
  }, [prayerData, currentTime]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-8 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <span className="text-4xl">🕌</span>
            Jadwal Shalat
          </h1>
          <p className="text-emerald-100 text-sm md:text-base">
            Data akurat dari Kementerian Agama RI
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Current Time and Date */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 text-center">
          <div className="text-5xl md:text-6xl font-bold text-emerald-600 tabular-nums mb-2">
            {formatTime(currentTime)}
          </div>
          <div className="text-gray-600 text-sm md:text-base">
            {formatDate(currentTime)}
          </div>
          {prayerData && (
            <div className="mt-3 text-xs md:text-sm text-gray-500">
              {prayerData.date.hijri.date} {prayerData.date.hijri.month.en}{" "}
              {prayerData.date.hijri.year} H
            </div>
          )}
        </div>

        {/* Location Selector */}
        <LocationSelector
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />

        {/* Next Prayer Countdown */}
        {nextPrayer && !loading && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl shadow-xl p-6 mb-6 text-center">
            <div className="text-white">
              <div className="text-sm md:text-base font-medium mb-2 opacity-90">
                Waktu Shalat Selanjutnya
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">
                {nextPrayer.name}
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-2 tabular-nums">
                {nextPrayer.time}
              </div>
              <div className="text-sm md:text-base opacity-90">
                🕐 {nextPrayer.remaining} lagi
              </div>
            </div>
          </div>
        )}

        {/* Prayer Times Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent"></div>
          </div>
        ) : prayerData ? (
          <div className="space-y-4">
            {Object.entries(prayerNames).map(([key, value]) => {
              const time = prayerData.timings[key as keyof typeof prayerData.timings];
              const isNext = nextPrayer?.name === value.id;

              return (
                <PrayerCard
                  key={key}
                  name={value.id}
                  arabicName={value.ar}
                  time={time}
                  isNext={isNext}
                  icon={value.icon}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            Gagal memuat jadwal shalat. Silakan coba lagi.
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p className="mb-2">
            Metode perhitungan: Kementerian Agama Republik Indonesia
          </p>
          <p className="text-xs">
            Mohon sesuaikan dengan adzan masjid terdekat
          </p>
        </div>
      </div>
    </div>
  );
}
