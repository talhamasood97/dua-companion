/**
 * GA4 custom event helpers — single source of truth for all tracking.
 *
 * Why this file exists:
 *   - Removes scattered `(window as any).gtag?.()` calls from components
 *   - Provides TypeScript types so events are discoverable and refactor-safe
 *   - Makes it trivial to see every event the app fires in one place
 *
 * How to read results in GA4:
 *   Reports → Engagement → Events  (all events)
 *   Explore → Free-form          (filter by event + params)
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Internal: fire a gtag event. Silent no-op when GA not loaded. */
function track(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // GA not available (e.g. ad-blocker, SSR, local dev without GA_ID)
  }
}

// ── Search ────────────────────────────────────────────────────────────────────

/**
 * Fired when user submits the search form.
 * GA4 built-in event — appears in Reports → Search terms automatically.
 */
export function trackSearch(query: string, resultCount: number): void {
  track("search", {
    search_term: query,
    result_count: resultCount,
  });
}

/**
 * Fired when user clicks one of the pre-filled suggestion chips.
 * Shows which suggestions drive traffic — helps prioritise content.
 */
export function trackSearchSuggestion(suggestion: string): void {
  track("search_suggestion_click", { suggestion });
}

/**
 * Fired when a search returns zero results.
 * These are your content gaps — queries you have no duas for.
 */
export function trackSearchNoResults(query: string): void {
  track("search_no_results", { search_term: query });
}

// ── Dua interactions ─────────────────────────────────────────────────────────

/**
 * Fired when a dua detail page is viewed.
 * Tells you which categories, emotions, and sources are most popular.
 */
export function trackDuaViewed(
  slug: string,
  category: string,
  sourceBook: string,
  grade: string
): void {
  track("dua_viewed", {
    dua_slug: slug,
    category,
    source_book: sourceBook,
    grade,
  });
}

/**
 * Fired when user saves a dua. Already wired in SaveButton — imported here
 * for consistency so all events live in one place.
 */
export function trackSaveDua(slug: string, title: string): void {
  track("save_dua", { dua_slug: slug, dua_title: title });
}

/** Fired when user unsaves a dua. */
export function trackUnsaveDua(slug: string, title: string): void {
  track("unsave_dua", { dua_slug: slug, dua_title: title });
}

/**
 * Fired when user shares a dua.
 * `method` is one of: whatsapp | twitter | facebook | copy_link | native
 */
export function trackShareDua(method: string, slug: string): void {
  track("share", { method, content_type: "dua", item_id: slug });
}

// ── Hadith interactions ───────────────────────────────────────────────────────

/**
 * Fired when a hadith detail page is viewed.
 * Tells you which topics and grades resonate most.
 */
export function trackHadithViewed(
  slug: string,
  topic: string,
  sourceBook: string,
  grade: string
): void {
  track("hadith_viewed", {
    hadith_slug: slug,
    topic,
    source_book: sourceBook,
    grade,
  });
}

// ── Email subscription ────────────────────────────────────────────────────────

/** Fired when user clicks the Subscribe button. Measures form engagement. */
export function trackSubscribeAttempt(): void {
  track("subscribe_attempt");
}

/**
 * Fired when subscription API returns success.
 * Divide this by subscribe_attempt to get your conversion rate.
 */
export function trackSubscribeSuccess(): void {
  track("subscribe_success");
}

/**
 * Fired when subscription fails.
 * `reason` is the error message — helps debug specific failure modes.
 */
export function trackSubscribeError(reason: string): void {
  track("subscribe_error", { reason });
}

// ── Saved collection ─────────────────────────────────────────────────────────

/** Fired when user saves an entire shared collection to their own. */
export function trackSaveSharedCollection(count: number): void {
  track("save_shared_collection", { count });
}

/**
 * Fired when user shares their saved collection.
 * `method` is one of: native | copy
 */
export function trackShareCollection(method: string, count: number): void {
  track("share_collection", { method, count });
}

// ── Browse / discovery ────────────────────────────────────────────────────────

/** Fired when a category page is viewed. */
export function trackCategoryViewed(category: string): void {
  track("category_viewed", { category });
}

/** Fired when an emotion page is viewed. */
export function trackEmotionViewed(emotion: string): void {
  track("emotion_viewed", { emotion });
}
