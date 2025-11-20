"use client";

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  arabicName: string;
  icon: string;
}

export default function PrayerCard({
  name,
  time,
  isNext,
  arabicName,
  icon,
}: PrayerCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-5 transition-all duration-300 ${
        isNext
          ? "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl scale-105 border-2 border-emerald-300"
          : "bg-white text-gray-800 shadow-md hover:shadow-lg border-2 border-gray-100"
      }`}
    >
      {isNext && (
        <div className="absolute top-0 right-0 bg-yellow-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-bl-xl">
          Selanjutnya
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`text-3xl ${
              isNext ? "opacity-100" : "opacity-70"
            }`}
          >
            {icon}
          </div>
          <div>
            <h3
              className={`font-bold text-lg ${
                isNext ? "text-white" : "text-gray-800"
              }`}
            >
              {name}
            </h3>
            <p
              className={`text-sm ${
                isNext ? "text-emerald-100" : "text-gray-500"
              }`}
            >
              {arabicName}
            </p>
          </div>
        </div>

        <div
          className={`text-2xl font-bold tabular-nums ${
            isNext ? "text-white" : "text-emerald-600"
          }`}
        >
          {time}
        </div>
      </div>

      {isNext && (
        <div className="absolute -bottom-1 -right-1 w-24 h-24 bg-white opacity-5 rounded-full blur-2xl" />
      )}
    </div>
  );
}
