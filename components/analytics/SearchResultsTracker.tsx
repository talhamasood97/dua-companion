"use client";

import { useEffect } from "react";
import { trackSearch, trackSearchNoResults } from "@/lib/analytics";

interface SearchResultsTrackerProps {
  query: string;
  resultCount: number;
}

/**
 * Client component rendered by the (server) SearchPage.
 * Fires on every search so GA4 knows:
 *   - What people searched for
 *   - How many results they got
 *   - Which queries return zero results (your content gaps)
 */
export function SearchResultsTracker({ query, resultCount }: SearchResultsTrackerProps) {
  useEffect(() => {
    if (!query) return;
    trackSearch(query, resultCount);
    if (resultCount === 0) {
      trackSearchNoResults(query);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]); // re-fires when query changes, not on resultCount change

  return null; // renders nothing
}
