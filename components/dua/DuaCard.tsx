import Link from "next/link";
import { BookOpen } from "lucide-react";
import { AuthenticityBadge } from "./AuthenticityBadge";
import { getCategoryMeta } from "@/lib/utils";
import type { Dua } from "@/types";

export function DuaCard({ dua }: { dua: Dua }) {
  const category = getCategoryMeta(dua.category);

  return (
    <Link
      href={`/duas/${dua.slug}`}
      className="dua-card group flex flex-col bg-white dark:bg-emerald-950/40 rounded-2xl p-5 sm:p-6 border border-stone-100 dark:border-emerald-900 hover:border-emerald-200 dark:hover:border-emerald-700 shadow-sm"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <h3 className="font-semibold text-stone-800 dark:text-stone-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors leading-snug">
          {dua.title}
        </h3>
        <AuthenticityBadge grade={dua.authenticity_grade} />
      </div>

      {/* Arabic */}
      <p
        className="arabic text-right text-2xl text-stone-700 dark:text-stone-200 mb-4 leading-loose line-clamp-3"
        dir="rtl"
        lang="ar"
      >
        {dua.arabic_text}
      </p>

      {/* Translation preview */}
      <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-2 mb-4 leading-relaxed min-h-[2.5rem]">
        {dua.translation}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500 min-w-0">
          <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{dua.source_book}</span>
          {dua.hadith_number && (
            <>
              <span className="text-stone-300 dark:text-stone-600 flex-shrink-0">·</span>
              <span className="flex-shrink-0">{dua.hadith_number}</span>
            </>
          )}
        </div>
        {category && (
          <span className={`text-xs font-medium flex-shrink-0 ${category.color}`}>
            {category.icon} {category.title}
          </span>
        )}
      </div>
    </Link>
  );
}
