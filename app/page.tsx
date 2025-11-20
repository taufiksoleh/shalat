"use client";

import { useEffect, useState } from "react";
import { Page, Navbar, Block, List, Card } from "konsta/react";
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
    <Page className="pb-20">
      <Navbar
        title="Jadwal Shalat"
        subtitle="Kementerian Agama RI"
        large
        transparent
      />

      {/* Current Time and Date Card */}
      <Block strong inset className="space-y-4">
        <Card className="p-6">
          <div className="text-[56px] font-semibold leading-[64px] tabular-nums tracking-tight">
            {formatTime(currentTime)}
          </div>
          <div className="text-[15px] text-gray-600 dark:text-gray-400 mt-1 font-medium">
            {formatDate(currentTime)}
          </div>
          {prayerData && (
            <div className="mt-2 text-[13px] text-gray-500 dark:text-gray-500 font-medium">
              {prayerData.date.hijri.date} {prayerData.date.hijri.month.en}{" "}
              {prayerData.date.hijri.year} H
            </div>
          )}
        </Card>
      </Block>

      {/* Location Selector */}
      <Block strong inset>
        <List>
          <LocationSelector
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </List>
      </Block>

      {/* Next Prayer Countdown */}
      {nextPrayer && !loading && (
        <Block strong inset>
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6">
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
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          </Card>
        </Block>
      )}

      {/* Prayer Times List */}
      {loading ? (
        <Block className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-ios-blue border-t-transparent"></div>
        </Block>
      ) : prayerData ? (
        <Block strong inset>
          <List strongIos insetIos>
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
          </List>
        </Block>
      ) : (
        <Block className="text-center py-10 text-gray-500 text-[15px]">
          Gagal memuat jadwal shalat. Silakan coba lagi.
        </Block>
      )}

      {/* Footer */}
      <Block className="text-center pb-8">
        <p className="text-[13px] text-gray-500 font-medium mb-1">
          Metode perhitungan: Kementerian Agama Republik Indonesia
        </p>
        <p className="text-[11px] text-gray-400">
          Mohon sesuaikan dengan adzan masjid terdekat
        </p>
      </Block>
    </Page>
  );
}
