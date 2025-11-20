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
      className={`relative overflow-hidden rounded-[16px] transition-all duration-200 ${
        isNext
          ? "bg-gradient-to-br from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 ios-shadow scale-[1.02]"
          : "bg-white dark:bg-[var(--ios-gray)] ios-shadow-sm active:scale-[0.98]"
      }`}
    >
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side: Icon and Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div
              className={`text-[32px] leading-none flex-shrink-0 ${
                isNext ? "opacity-100 scale-110" : "opacity-80"
              } transition-all duration-200`}
            >
              {icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3
                className={`font-semibold text-[17px] leading-[22px] tracking-[-0.408px] ${
                  isNext ? "text-white" : "text-[var(--foreground)]"
                }`}
              >
                {name}
              </h3>
              <p
                className={`text-[13px] leading-[18px] mt-0.5 font-medium ${
                  isNext ? "text-white/80" : "text-[var(--ios-gray-6)]"
                }`}
              >
                {arabicName}
              </p>
            </div>
          </div>

          {/* Right side: Time */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            {isNext && (
              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-white text-[11px] font-bold uppercase tracking-wide">
                  Next
                </span>
              </div>
            )}
            <div
              className={`text-[24px] font-semibold tabular-nums tracking-tight leading-none ${
                isNext ? "text-white" : "text-[var(--ios-blue)]"
              }`}
            >
              {time}
            </div>
            {!isNext && (
              <svg
                className="w-5 h-5 text-[var(--ios-gray-4)] flex-shrink-0"
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
            )}
          </div>
        </div>
      </div>

      {/* Decorative glow for active prayer */}
      {isNext && (
        <>
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
        </>
      )}

      {/* iOS-style separator for non-active items */}
      {!isNext && (
        <div className="absolute bottom-0 left-14 right-0 h-[0.5px] bg-[var(--ios-separator)]" />
      )}
    </div>
  );
}
