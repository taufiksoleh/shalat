"use client";

import { useEffect, useState, useCallback } from "react";
import { Page, Block } from "konsta/react";
import { City, PrayerTimesData, NextPrayer } from "@/types/prayer";
import { indonesianCities } from "@/lib/indonesian-cities";
import LocationPermissionPopup from "@/components/LocationPermissionPopup";
import CitySelectorModal from "@/components/CitySelectorModal";

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

const LOCATION_STORAGE_KEY = "shalat_location";
const LOCATION_ASKED_KEY = "shalat_location_asked";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<City>(indonesianCities[0]);
  const [prayerData, setPrayerData] = useState<PrayerTimesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState<NextPrayer | null>(null);
  const [currentPrayer, setCurrentPrayer] = useState<CurrentPrayer | null>(null);

  // Location states
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [usingGPS, setUsingGPS] = useState(false);

  // Helper to clean time string (remove timezone info like "(WIB)")
  const cleanTime = (time: string) => time.split(" ")[0];

  // Handle geolocation detection
  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation tidak didukung oleh browser Anda");
      setShowLocationPopup(false);
      setShowCitySelector(true);
      return;
    }

    setIsDetectingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Create a custom location or find nearest city
        const customCity: City = {
          name: "Lokasi Saya",
          latitude,
          longitude,
        };

        // Save to localStorage
        localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(customCity));
        localStorage.setItem(LOCATION_ASKED_KEY, "true");

        setSelectedCity(customCity);
        setUsingGPS(true);
        setIsDetectingLocation(false);
        setShowLocationPopup(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        setIsDetectingLocation(false);
        setShowLocationPopup(false);

        // Show city selector if permission denied
        if (error.code === error.PERMISSION_DENIED) {
          localStorage.setItem(LOCATION_ASKED_KEY, "true");
          setShowCitySelector(true);
        } else {
          alert("Gagal mendeteksi lokasi. Silakan pilih kota secara manual.");
          setShowCitySelector(true);
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes cache
      }
    );
  }, []);

  // Handle manual city selection
  const handleCitySelect = useCallback((city: City) => {
    localStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(city));
    localStorage.setItem(LOCATION_ASKED_KEY, "true");
    setSelectedCity(city);
    setUsingGPS(false);
  }, []);

  // Initialize location on first load
  useEffect(() => {
    const savedLocation = localStorage.getItem(LOCATION_STORAGE_KEY);
    const locationAsked = localStorage.getItem(LOCATION_ASKED_KEY);

    if (savedLocation) {
      try {
        const location = JSON.parse(savedLocation) as City;
        setSelectedCity(location);
        setUsingGPS(location.name === "Lokasi Saya");
      } catch {
        // Invalid saved location, show popup
        if (!locationAsked) {
          setShowLocationPopup(true);
        }
      }
    } else if (!locationAsked) {
      // First time user, show permission popup after a short delay
      const timer = setTimeout(() => {
        setShowLocationPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

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

    // Helper to clean time string (remove timezone info like "(WIB)")
    const cleanTimeStr = (time: string) => time.split(" ")[0];

    const prayers = [
      { name: "Subuh", time: cleanTimeStr(prayerData.timings.Fajr), key: "Fajr" },
      { name: "Dzuhur", time: cleanTimeStr(prayerData.timings.Dhuhr), key: "Dhuhr" },
      { name: "Ashar", time: cleanTimeStr(prayerData.timings.Asr), key: "Asr" },
      { name: "Maghrib", time: cleanTimeStr(prayerData.timings.Maghrib), key: "Maghrib" },
      { name: "Isya", time: cleanTimeStr(prayerData.timings.Isha), key: "Isha" },
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
        remaining: diff < 60 ? `${minutesLeft}m` : `${hoursLeft}j ${minutesLeft}m`,
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
        remaining: diff < 60 ? `${minutesLeft}m` : `${hoursLeft}j ${minutesLeft}m`,
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
    <Page className="bg-gradient-to-br from-primary-50 via-white to-accent-50 pb-20">
      {/* Header Section */}
      <div className="px-5 pt-4 pb-6">
        <div className="flex items-center justify-between mb-6">
          {/* Profile Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center text-2xl shadow-soft">
              👤
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Hari Ini</div>
              <div className="text-base font-bold text-gray-900">
                {prayerData ? formatHijriDate() : "Loading..."}
              </div>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full px-3.5 py-1.5 shadow-soft">
              <span className="text-lg">⭐</span>
              <span className="text-white text-sm font-bold">6.7k</span>
            </div>
            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-xl hover:shadow-soft-lg transition-all">
              🔔
            </button>
            <button className="w-10 h-10 rounded-full bg-white shadow-soft flex items-center justify-center text-xl hover:shadow-soft-lg transition-all">
              🎁
            </button>
          </div>
        </div>

        {/* Prayer Time Cards */}
        {!loading && prayerData && currentPrayer && nextPrayer && (
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            {/* Current Prayer Card */}
            <div className="modern-card p-5 bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                <span className="text-xs font-medium opacity-90">Sekarang</span>
              </div>
              <div className="text-2xl font-bold mb-1 flex items-center gap-2">
                {currentPrayer.name}
                <span className="text-xl">🌤️</span>
              </div>
              <div className="text-3xl font-black tabular-nums">
                {currentPrayer.time}
              </div>
            </div>

            {/* Next Prayer Card */}
            <div className="modern-card p-5 gradient-accent text-white">
              <div className="text-xs font-medium opacity-90 mb-2">Selanjutnya</div>
              <div className="text-2xl font-bold mb-1">{nextPrayer.name}</div>
              <div className="text-xl font-bold tabular-nums">
                dalam {nextPrayer.remaining}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="bg-gradient-to-b from-white to-gray-50 dark:bg-gray-900 rounded-t-[32px] min-h-screen pt-8 shadow-soft-lg">
        {/* Features Section */}
        <Block className="px-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fitur Anda</h2>
            <button className="text-sm text-primary-600 font-semibold flex items-center gap-1 hover:text-primary-700 transition-colors">
              Semua <span className="text-base">→</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-5 gap-3 mb-8">
            <button className="flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center text-2xl shadow-soft group-hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                🧭
              </div>
              <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">Kiblat</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900 dark:to-success-800 flex items-center justify-center text-2xl shadow-soft group-hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                🤲
              </div>
              <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">Doa</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 dark:from-accent-900 dark:to-accent-800 flex items-center justify-center text-2xl shadow-soft group-hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                📿
              </div>
              <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">Tasbih</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800 flex items-center justify-center text-2xl shadow-soft group-hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                💡
              </div>
              <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">Inspirasi</span>
            </button>
            <button className="flex flex-col items-center gap-2.5 group">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900 dark:to-indigo-800 flex items-center justify-center text-2xl shadow-soft group-hover:shadow-soft-lg transition-all group-hover:-translate-y-1">
                📖
              </div>
              <span className="text-xs text-center font-medium text-gray-700 dark:text-gray-300">Jurnal</span>
            </button>
          </div>
        </Block>

        {/* Explore More Section */}
        <Block className="px-5">
          <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Jelajahi Lebih Luas</h3>

          <div className="space-y-4">
            <button className="modern-card w-full bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 border-0 p-5 group">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm">
                    🎮
                  </div>
                  <span className="font-bold text-base">Kuis Al-Qur&apos;an</span>
                </div>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            <button className="modern-card w-full gradient-success border-0 p-5 group">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-sm">
                    💰
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base mb-0.5">Jurnal Sedekah</div>
                    <div className="text-xs opacity-90 font-medium">
                      Catat & lacak amal Anda
                    </div>
                  </div>
                </div>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>
          </div>
        </Block>

        {/* Prayer Times List */}
        {loading ? (
          <Block className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary-200 border-t-primary-600"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xl">🕌</div>
            </div>
          </Block>
        ) : prayerData ? (
          <Block className="px-5 mt-8">
            <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Jadwal Shalat Hari Ini</h3>
            <div className="modern-card p-5 space-y-1">
              {Object.entries(prayerNames).map(([key, value]) => {
                const rawTime = prayerData.timings[key as keyof typeof prayerData.timings];
                const time = cleanTime(rawTime);
                const isNext = nextPrayer?.name === value.id;
                const isCurrent = currentPrayer?.name === value.id;

                return (
                  <div
                    key={key}
                    className={`flex items-center justify-between py-3.5 px-4 -mx-4 rounded-2xl transition-all ${
                      isNext ? "bg-gradient-to-r from-accent-50 to-accent-100 dark:from-accent-900/20 dark:to-accent-800/20" :
                      isCurrent ? "bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isNext ? "bg-accent-200 dark:bg-accent-800" :
                        isCurrent ? "bg-primary-200 dark:bg-primary-800" :
                        "bg-gray-100 dark:bg-gray-800"
                      }`}>
                        {value.icon}
                      </div>
                      <div>
                        <div className="font-bold text-base text-gray-900 dark:text-white">{value.id}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{value.ar}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {isNext && (
                        <span className="gradient-accent text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-soft">
                          Selanjutnya
                        </span>
                      )}
                      {isCurrent && (
                        <span className="gradient-primary text-white text-xs px-3 py-1.5 rounded-lg font-bold shadow-soft">
                          Sekarang
                        </span>
                      )}
                      <span className="font-black text-xl tabular-nums text-gray-900 dark:text-white">{time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-6 mb-10">
              <button
                onClick={() => setShowCitySelector(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 rounded-full shadow-soft hover:shadow-soft-lg transition-all active:scale-95"
              >
                <span className="text-base">{usingGPS ? "📡" : "📍"}</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{selectedCity.name}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {usingGPS && (
                <p className="text-xs text-primary-600 dark:text-primary-400 font-medium mt-2">
                  Menggunakan GPS
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-2">
                Metode: Kementerian Agama RI
              </p>
            </div>
          </Block>
        ) : (
          <Block className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">
              Gagal memuat jadwal shalat
            </p>
            <button className="mt-4 px-6 py-2.5 gradient-primary text-white rounded-full font-semibold shadow-soft hover:shadow-soft-lg transition-all">
              Coba Lagi
            </button>
          </Block>
        )}
      </div>

      {/* Location Permission Popup */}
      <LocationPermissionPopup
        isOpen={showLocationPopup}
        onClose={() => {
          setShowLocationPopup(false);
          localStorage.setItem(LOCATION_ASKED_KEY, "true");
        }}
        onAllowLocation={detectLocation}
        onSelectManually={() => {
          setShowLocationPopup(false);
          setShowCitySelector(true);
        }}
        isLoading={isDetectingLocation}
      />

      {/* City Selector Modal */}
      <CitySelectorModal
        isOpen={showCitySelector}
        onClose={() => setShowCitySelector(false)}
        onSelectCity={handleCitySelect}
        selectedCity={selectedCity}
      />
    </Page>
  );
}
