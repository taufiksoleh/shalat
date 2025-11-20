"use client";

import { ListItem } from "konsta/react";

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
  if (isNext) {
    // Special highlighted card for next prayer
    return (
      <div className="relative overflow-hidden rounded-2xl transition-all duration-200 bg-gradient-to-br from-green-500 to-teal-500 dark:from-green-600 dark:to-teal-600 shadow-lg scale-[1.02]">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="text-[32px] leading-none flex-shrink-0 scale-110">
                {icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[17px] leading-[22px] tracking-[-0.408px] text-white">
                  {name}
                </h3>
                <p className="text-[13px] leading-[18px] mt-0.5 font-medium text-white/80">
                  {arabicName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-3">
              <div className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-white text-[11px] font-bold uppercase tracking-wide">
                  Next
                </span>
              </div>
              <div className="text-[24px] font-semibold tabular-nums tracking-tight leading-none text-white">
                {time}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      </div>
    );
  }

  // Use Konsta UI ListItem for regular prayers
  return (
    <ListItem
      link
      chevronIos
      title={name}
      subtitle={arabicName}
      after={<span className="text-[20px] font-semibold tabular-nums text-ios-blue">{time}</span>}
      media={
        <div className="text-[28px] leading-none opacity-80">
          {icon}
        </div>
      }
    />
  );
}
