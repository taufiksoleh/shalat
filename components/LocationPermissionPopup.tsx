"use client";

import { useState } from "react";

interface LocationPermissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAllowLocation: () => void;
  onSelectManually: () => void;
  isLoading?: boolean;
}

export default function LocationPermissionPopup({
  isOpen,
  onClose,
  onAllowLocation,
  onSelectManually,
  isLoading = false,
}: LocationPermissionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden animate-slide-up">
        {/* Header with illustration */}
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-accent-600 px-6 pt-8 pb-12 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          {/* Mosque Icon */}
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
              <span className="text-5xl">🕌</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              Assalamu&apos;alaikum
            </h2>
            <p className="text-white/90 text-sm">
              Izinkan kami mengetahui lokasi Anda
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 -mt-6 bg-white rounded-t-3xl relative">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">
              Dengan mengetahui lokasi Anda, kami dapat menampilkan
              <span className="font-semibold text-primary-600"> waktu shalat yang akurat </span>
              sesuai dengan posisi Anda saat ini.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-primary-50 rounded-xl">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Waktu Shalat Akurat</p>
                <p className="text-xs text-gray-500">Berdasarkan koordinat lokasi Anda</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-accent-50 rounded-xl">
              <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                <span className="text-lg">🧭</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">Arah Kiblat Tepat</p>
                <p className="text-xs text-gray-500">Untuk panduan shalat Anda</p>
              </div>
            </div>
          </div>

          {/* Privacy note */}
          <div className="flex items-start gap-2 mb-6 p-3 bg-gray-50 rounded-xl">
            <span className="text-lg">🔒</span>
            <p className="text-xs text-gray-500 leading-relaxed">
              Privasi Anda penting bagi kami. Lokasi Anda hanya digunakan untuk
              menghitung waktu shalat dan tidak akan disimpan atau dibagikan.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={onAllowLocation}
              disabled={isLoading}
              className="w-full py-4 px-6 gradient-primary text-white font-bold rounded-2xl shadow-soft hover:shadow-soft-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Mendeteksi Lokasi...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">📍</span>
                  <span>Izinkan Lokasi</span>
                </>
              )}
            </button>

            <button
              onClick={onSelectManually}
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              Pilih Kota Manual
            </button>
          </div>

          {/* Close hint */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Ketuk di luar untuk menutup
          </p>
        </div>
      </div>
    </div>
  );
}
