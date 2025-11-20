export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface PrayerTimesData {
  timings: PrayerTimes;
  date: {
    readable: string;
    hijri: {
      date: string;
      month: {
        en: string;
        ar: string;
      };
      year: string;
    };
    gregorian: {
      date: string;
      month: {
        number: number;
        en: string;
      };
      year: string;
    };
  };
}

export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface NextPrayer {
  name: string;
  time: string;
  remaining: string;
}
