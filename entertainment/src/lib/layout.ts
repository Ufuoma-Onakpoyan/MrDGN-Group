/**
 * Shared layout constants for consistent structure across the site.
 * Event-sponsorship focused. Use these for section spacing and container widths.
 */
export const LAYOUT = {
  /** Top padding for main content (below fixed header) */
  pageTop: "pt-24 pb-16 md:pt-28 md:pb-20",
  /** Standard section vertical padding */
  section: "py-16 md:py-20",
  /** Slightly smaller section padding */
  sectionSm: "py-12 md:py-16",
  /** Narrow content (e.g. about, contact intro) */
  containerNarrow: "max-w-4xl mx-auto",
  /** Wide content (e.g. event cards, blog grid) */
  containerWide: "max-w-6xl mx-auto",
  /** Page title (h1) */
  title: "text-4xl md:text-5xl font-bold mb-6",
  /** Section title (h2) */
  sectionTitle: "text-2xl md:text-3xl font-bold mb-6",
  /** Section subtitle / intro paragraph */
  sectionIntro: "text-muted-foreground max-w-2xl",
} as const;
