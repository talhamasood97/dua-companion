"use client";

import { useEffect } from "react";
import { trackHadithViewed } from "@/lib/analytics";

interface HadithViewTrackerProps {
  slug: string;
  topic: string;
  sourceBook: string;
  grade: string;
}

/**
 * Client component rendered by the (server) HadithPage.
 * Fires `hadith_viewed` once when the page mounts.
 *
 * In GA4 → Explore you can then answer:
 *   - Which hadith topics resonate most?
 *   - Which source books drive the most views?
 */
export function HadithViewTracker({ slug, topic, sourceBook, grade }: HadithViewTrackerProps) {
  useEffect(() => {
    trackHadithViewed(slug, topic, sourceBook, grade);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
