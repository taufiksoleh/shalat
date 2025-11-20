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
        // Call Aladhan API directly with Kemenag calculation method
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&method=11`
        );
        const result = await response.json();
        setPrayerData(result.data);
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
    <div className="min-h-screen bg-[var(--background)] smooth-scroll">
      {/* iOS-style Large Title Header */}
      <div className="sticky top-0 z-50 glass-effect border-b border-[var(--ios-separator)]">
        <div className="max-w-4xl mx-auto">
          {/* Status bar spacing */}
          <div className="h-11" />

          {/* Navigation bar */}
          <div className="px-5 pb-3">
            <h1 className="text-[34px] font-bold leading-[41px] tracking-tight text-[var(--foreground)]">
              Jadwal Shalat
            </h1>
            <p className="text-[13px] text-[var(--ios-gray-6)] mt-0.5 font-medium">
              Kementerian Agama RI
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 pb-8 pt-5">
        {/* Current Time and Date - iOS Widget Style */}
        <div className="bg-white dark:bg-[var(--ios-gray)] rounded-[20px] ios-shadow p-6 mb-4 overflow-hidden relative">
          <div className="relative z-10">
            <div className="text-[56px] font-semibold leading-[64px] text-[var(--foreground)] tabular-nums tracking-tight">
              {formatTime(currentTime)}
            </div>
            <div className="text-[15px] text-[var(--ios-gray-6)] mt-1 font-medium">
              {formatDate(currentTime)}
            </div>
            {prayerData && (
              <div className="mt-2 text-[13px] text-[var(--ios-gray-5)] font-medium">
                {prayerData.date.hijri.date} {prayerData.date.hijri.month.en}{" "}
                {prayerData.date.hijri.year} H
              </div>
            )}
          </div>
          {/* Decorative gradient */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-teal-400/10 rounded-full blur-3xl" />
        </div>

        {/* Location Selector */}
        <LocationSelector
          selectedCity={selectedCity}
          onCityChange={setSelectedCity}
        />

        {/* Next Prayer Countdown - iOS Prominent Card */}
        {nextPrayer && !loading && (
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-[20px] ios-shadow p-6 mb-4">
            <div className="relative z-10 text-white">
              <div className="text-[13px] font-semibold uppercase tracking-wider opacity-80 mb-3">
                Waktu Shalat Selanjutnya
              </div>
              <div className="text-[28px] font-bold leading-[34px] mb-2">
                {nextPrayer.name}
              </div>
              <div className="text-[48px] font-semibold leading-[56px] tabular-nums tracking-tight mb-2">
                {nextPrayer.time}
              </div>
              <div className="text-[15px] font-medium opacity-90">
                {nextPrayer.remaining} lagi
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </div>
        )}

        {/* Prayer Times List - iOS Inset Grouped List Style */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-[var(--ios-blue)] border-t-transparent"></div>
          </div>
        ) : prayerData ? (
          <div className="space-y-2.5">
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
          <div className="text-center py-10 text-[var(--ios-gray-6)] text-[15px]">
            Gagal memuat jadwal shalat. Silakan coba lagi.
          </div>
        )}

        {/* Footer - iOS Style */}
        <div className="mt-8 text-center">
          <p className="text-[13px] text-[var(--ios-gray-5)] font-medium mb-1">
            Metode perhitungan: Kementerian Agama Republik Indonesia
          </p>
          <p className="text-[11px] text-[var(--ios-gray-6)]">
            Mohon sesuaikan dengan adzan masjid terdekat
          </p>
        </div>
      </div>

      {/* Safe area bottom spacing for iOS */}
      <div className="h-8" />
    </div>
  );
}
