import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import type { Dua } from "@/types";

export function DailyDuaBanner({ dua }: { dua: Dua }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link href="/daily-dua" className="block group">
          <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-emerald-900 dark:from-emerald-900 dark:to-emerald-950 rounded-3xl p-6 sm:p-8 border border-emerald-700 dark:border-emerald-800 shadow-lg hover:shadow-xl transition-shadow">
            {/* Decorative Arabic pattern */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px), radial-gradient(circle at 60% 80%, white 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
              {/* Left content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-4 h-4 text-gold-300 fill-gold-300" style={{ color: '#fcd34d', fill: '#fcd34d' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-300">
                    Daily Dua
                  </span>
                  <span className="text-xs text-emerald-500 ml-2 hidden sm:inline">
                    {today}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {dua.title}
                </h3>
                <p
                  className="arabic text-right text-2xl sm:text-3xl text-emerald-100 leading-loose mb-3 sm:mb-0"
                  dir="rtl"
                  lang="ar"
                >
                  {dua.arabic_text.split(" ").slice(0, 6).join(" ")}…
                </p>
              </div>

              {/* Right CTA */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3">
                <p className="text-sm text-emerald-200 hidden sm:block max-w-xs text-right line-clamp-2">
                  {dua.translation}
                </p>
                <span className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 group-hover:bg-white/20 text-white text-sm font-medium rounded-xl transition-colors whitespace-nowrap">
                  Read full dua <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
