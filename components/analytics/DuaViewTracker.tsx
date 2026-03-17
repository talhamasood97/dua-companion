"use client";

import { useEffect } from "react";
import { trackDuaViewed } from "@/lib/analytics";

interface DuaViewTrackerProps {
  slug: string;
  category: string;
  sourceBook: string;
  grade: string;
}

/**
 * Client component rendered by the (server) DuaPage.
 * Fires `dua_viewed` once when the page mounts.
 *
 * In GA4 → Explore you can then answer:
 *   - Which categories get the most views?
 *   - Which source books are most popular?
 *   - Sahih vs Hasan vs Quran — what do users prefer?
 */
export function DuaViewTracker({ slug, category, sourceBook, grade }: DuaViewTrackerProps) {
  useEffect(() => {
    trackDuaViewed(slug, category, sourceBook, grade);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
