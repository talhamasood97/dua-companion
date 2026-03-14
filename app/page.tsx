import type { Metadata } from "next";
import { HeroSearch } from "@/components/home/HeroSearch";
import { EmotionGrid } from "@/components/home/EmotionGrid";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedDuas } from "@/components/home/FeaturedDuas";
import { TrustBar } from "@/components/home/TrustBar";
import { DailyDuaBanner } from "@/components/home/DailyDuaBanner";
import { getFeaturedDuas, getDailyDua } from "@/lib/duas";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${SITE_NAME} – Authentic Islamic Duas with Arabic, Transliteration & Sources`,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [featured, daily] = await Promise.all([
    getFeaturedDuas(),
    getDailyDua(),
  ]);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="hero-gradient py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          {/* Bismillah */}
          <p
            className="arabic text-3xl sm:text-4xl text-emerald-700 dark:text-emerald-400 mb-6 leading-loose"
            dir="rtl"
            lang="ar"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <h1 className="text-3xl sm:text-5xl font-bold text-stone-800 dark:text-stone-100 mb-4 leading-tight tracking-tight">
            Authentic Duas.{" "}
            <span className="text-gradient">Verified Sources.</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            The world's most trusted Islamic supplication library — every dua
            with Arabic, transliteration, translation, and authentic Hadith
            reference.
          </p>

          <HeroSearch />
        </div>
      </section>

      {/* Daily Dua Banner */}
      <DailyDuaBanner dua={daily} />

      {/* Emotion-based discovery */}
      <EmotionGrid />

      {/* Categories */}
      <CategoryGrid />

      {/* Featured duas */}
      <FeaturedDuas duas={featured} />

      {/* Trust bar */}
      <TrustBar />
    </div>
  );
}
