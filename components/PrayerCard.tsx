"use client";

interface PrayerCardProps {
  name: string;
  time: string;
  isNext: boolean;
  isCurrent?: boolean;
  arabicName: string;
  icon: string;
}

export default function PrayerCard({
  name,
  time,
  isNext,
  isCurrent = false,
  arabicName,
  icon,
}: PrayerCardProps) {
  if (isNext || isCurrent) {
    // Special highlighted card for next/current prayer
    return (
      <div className={`
        relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-soft-lg
        ${isNext ? 'gradient-accent' : 'gradient-primary'}
      `}>
        <div className="px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-white">
                  {name}
                </h3>
                <p className="text-sm text-white/90 font-medium">
                  {arabicName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 ml-3">
              <div className="bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-white text-xs font-bold">
                  {isNext ? 'Selanjutnya' : 'Sekarang'}
                </span>
              </div>
              <div className="text-2xl font-black tabular-nums text-white">
                {time}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
      </div>
    );
  }

  // Modern card for regular prayers
  return (
    <div className="modern-card px-5 py-4 hover:shadow-soft-lg transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-2xl">
            {icon}
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {arabicName}
            </p>
          </div>
        </div>
        <div className="text-xl font-black tabular-nums text-gray-900 dark:text-white">
          {time}
        </div>
      </div>
    </div>
  );
}
