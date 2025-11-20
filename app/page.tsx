"use client";

import { useEffect, useState } from "react";
import { Page, Block, Card } from "konsta/react";
import { City, PrayerTimesData, NextPrayer } from "@/types/prayer";
import { indonesianCities } from "@/lib/indonesian-cities";

const prayerNames = {
  Fajr: { id: "Subuh", ar: "الفجر", icon: "🌅" },
  Dhuhr: { id: "Dzuhur", ar: "الظهر", icon: "☀️" },
  Asr: { id: "Ashar", ar: "العصر", icon: "🌤️" },
  Maghrib: { id: "Maghrib", ar: "المغرب", icon: "🌆" },
  Isha: { id: "Isya", ar: "العشاء", icon: "🌙" },
};

interface CurrentPrayer {
  name: string;
  time: string;
}

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(indonesianCities[0]);
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<CurrentPrayer | null>(null);

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

  // Calculate current and next prayer
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

    let current = null;
    let next = null;
    let nextIndex = -1;

    // Find current and next prayer
    for (let i = 0; i < prayers.length; i++) {
      const prayer = prayers[i];
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;

      if (prayerMinutes > currentMinutes) {
        next = prayer;
        nextIndex = i;
        break;
      }
    }

    // Set current prayer (the one before next)
    if (nextIndex > 0) {
      current = prayers[nextIndex - 1];
    } else if (nextIndex === 0) {
      // Before Fajr, current is Isha from yesterday
      current = prayers[prayers.length - 1];
    } else {
      // After Isha, current is Isha
      current = prayers[prayers.length - 1];
    }

    // Calculate time remaining for next prayer
    if (next) {
      const [hours, minutes] = next.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;
      const diff = prayerMinutes - currentMinutes;
      const hoursLeft = Math.floor(diff / 60);
      const minutesLeft = diff % 60;

      setNextPrayer({
        name: next.name,
        time: next.time,
        remaining: minutesLeft < 60 ? `${minutesLeft}m` : `${hoursLeft}j ${minutesLeft}m`,
      });
    } else {
      // After Isha, next prayer is Fajr tomorrow
      const [hours, minutes] = prayers[0].time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;
      const diff = 24 * 60 - currentMinutes + prayerMinutes;
      const hoursLeft = Math.floor(diff / 60);
      const minutesLeft = diff % 60;

      setNextPrayer({
        name: prayers[0].name,
        time: prayers[0].time,
        remaining: `${hoursLeft}j ${minutesLeft}m`,
      });
    }

    if (current) {
      setCurrentPrayer({
        name: current.name,
        time: current.time,
      });
    }
  }, [prayerData, currentTime]);

  const formatHijriDate = () => {
    if (!prayerData) return "";
    return `${prayerData.date.hijri.date} ${prayerData.date.hijri.month.en}`;
  };

  return (
    <Page className="bg-gradient-to-b from-teal-800 to-teal-900 pb-20">
      {/* Header Section */}
      <div className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between">
          {/* Profile Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="text-white">
              <div className="text-lg font-semibold">
                {prayerData ? formatHijriDate() : "Loading..."}
              </div>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
              <span className="text-xl">⭐</span>
              <span className="text-white text-sm font-semibold">6,7k</span>
            </div>
            <button className="text-2xl">🔔</button>
            <button className="text-2xl">🎁</button>
          </div>
        </div>
      </div>

      {/* Prayer Time Cards */}
      {!loading && prayerData && currentPrayer && nextPrayer && (
        <div className="px-4 pb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Current Prayer Card */}
            <Card className="bg-gradient-to-br from-teal-700 to-teal-800 border-0 rounded-3xl p-4">
              <div className="text-white">
                <div className="text-xs opacity-80 mb-1">• Sekarang</div>
                <div className="text-2xl font-bold mb-1 flex items-center gap-2">
                  {currentPrayer.name}
                  <span className="text-xl">🌤️</span>
                </div>
                <div className="text-3xl font-bold tabular-nums">
                  {currentPrayer.time}
                </div>
              </div>
            </Card>

            {/* Next Prayer Card */}
            <Card className="bg-gradient-to-br from-teal-700 to-teal-800 border-0 rounded-3xl p-4">
              <div className="text-white">
                <div className="text-xs opacity-80 mb-1">Selanjutnya</div>
                <div className="text-2xl font-bold mb-1">{nextPrayer.name}</div>
                <div className="text-xl font-bold tabular-nums">
                  dalam {nextPrayer.remaining}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-900 rounded-t-[30px] min-h-screen pt-6">
        {/* Features Section */}
        <Block className="px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Fitur Anda</h2>
            <button className="text-sm text-teal-600 font-semibold flex items-center gap-1">
              🔍 Semua fitur
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-2xl">
                🧭
              </div>
              <span className="text-xs text-center">Kiblat</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-2xl">
                🤲
              </div>
              <span className="text-xs text-center">Doa-doa</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center text-2xl">
                📿
              </div>
              <span className="text-xs text-center">Tasbih</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-2xl">
                💡
              </div>
              <span className="text-xs text-center">Inspirasi</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-2xl">
                📖
              </div>
              <span className="text-xs text-center">Jurnal</span>
            </div>
          </div>
        </Block>

        {/* Explore More Section */}
        <Block className="px-4">
          <h3 className="text-lg font-bold mb-3">Jelajahi lebih luas</h3>

          <div className="space-y-3">
            <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 border-0 rounded-2xl p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🎮</span>
                  <span className="font-semibold">Permainan Kuis Al-Qur&apos;an</span>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-teal-600 to-teal-700 border-0 rounded-2xl p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <span className="text-3xl">💰</span>
                  <div className="mt-1 text-sm font-medium">
                    Abadikan, kenangan, dan lacak<br />sedekah Anda di jurnal Anda hari ini
                  </div>
                </div>
                <span className="text-2xl">→</span>
              </div>
            </Card>
          </div>
        </Block>

        {/* Prayer Times List */}
        {loading ? (
          <Block className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-teal-600 border-t-transparent"></div>
          </Block>
        ) : prayerData ? (
          <Block className="px-4 mt-6">
            <h3 className="text-lg font-bold mb-3">Jadwal Shalat Hari Ini</h3>
            <Card className="rounded-2xl p-4 space-y-3">
              {Object.entries(prayerNames).map(([key, value]) => {
                const time = prayerData.timings[key as keyof typeof prayerData.timings];
                const isNext = nextPrayer?.name === value.id;
                const isCurrent = currentPrayer?.name === value.id;

                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between py-2 ${
                      isNext || isCurrent ? "bg-teal-50 dark:bg-teal-900/20 rounded-xl px-3 -mx-1" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{value.icon}</span>
                      <div>
                        <div className="font-semibold">{value.id}</div>
                        <div className="text-xs text-gray-500">{value.ar}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isNext && (
                        <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-md font-semibold">
                          Selanjutnya
                        </span>
                      )}
                      {isCurrent && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-md font-semibold">
                          Sekarang
                        </span>
                      )}
                      <span className="font-bold text-lg tabular-nums">{time}</span>
                    </div>
                  </div>
                );
              })}
            </Card>
            <div className="text-center mt-4 mb-8">
              <p className="text-xs text-gray-500 font-medium mb-1">
                📍 {selectedCity.name}
              </p>
              <p className="text-xs text-gray-400">
                Metode perhitungan: Kementerian Agama RI
              </p>
            </div>
          </Block>
        ) : (
          <Block className="text-center py-10 text-gray-500 text-[15px]">
            Gagal memuat jadwal shalat. Silakan coba lagi.
          </Block>
        )}
      </div>
    </Page>
  );
}
