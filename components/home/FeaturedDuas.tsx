import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DuaCard } from "@/components/dua/DuaCard";
import type { Dua } from "@/types";

export function FeaturedDuas({ duas }: { duas: Dua[] }) {
  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100 mb-2">
              Popular Duas
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Most-read authentic supplications
            </p>
          </div>
          <Link
            href="/search"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {duas.slice(0, 6).map((dua) => (
            <DuaCard key={dua.id} dua={dua} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline"
          >
            Browse all duas <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
