/**
 * 34 granular hadith topics consolidated into 6 browsable categories.
 * Each topic maps to exactly one category slug.
 */

export interface HadithCategory {
  slug: string;
  label: string;
  icon: string;
  description: string;
  topics: string[];
}

export const HADITH_CATEGORIES: HadithCategory[] = [
  {
    slug: "character",
    label: "Character & Ethics",
    icon: "⭐",
    description: "Honesty, humility, self-control and moral conduct",
    topics: ["anger", "character", "honesty", "humility", "modesty", "sincerity", "speech", "trustworthiness"],
  },
  {
    slug: "worship",
    label: "Faith & Worship",
    icon: "🕌",
    description: "Prayer, dhikr, fasting and reliance on Allah",
    topics: ["cleanliness", "dhikr", "fasting", "intention", "mindfulness", "reliance", "worship"],
  },
  {
    slug: "social",
    label: "Social & Community",
    icon: "🤝",
    description: "Brotherhood, family, justice and serving others",
    topics: ["brotherhood", "community", "family", "friendship", "justice", "neighbors", "service"],
  },
  {
    slug: "heart",
    label: "Heart & Soul",
    icon: "💚",
    description: "Repentance, gratitude, hope, patience and contentment",
    topics: ["contentment", "dunya", "ease", "gratitude", "hope", "patience", "repentance"],
  },
  {
    slug: "compassion",
    label: "Kindness & Mercy",
    icon: "❤️",
    description: "Gentleness, kindness and mercy to all creation",
    topics: ["gentleness", "kindness", "mercy"],
  },
  {
    slug: "knowledge",
    label: "Knowledge & Giving",
    icon: "📚",
    description: "Seeking knowledge and giving in the way of Allah",
    topics: ["charity", "knowledge"],
  },
];

/** Map every granular topic → its parent category slug */
export const TOPIC_TO_CATEGORY: Record<string, string> = Object.fromEntries(
  HADITH_CATEGORIES.flatMap((cat) => cat.topics.map((t) => [t, cat.slug]))
);

/** Get a category by its slug */
export function getHadithCategory(slug: string): HadithCategory | undefined {
  return HADITH_CATEGORIES.find((c) => c.slug === slug);
}
