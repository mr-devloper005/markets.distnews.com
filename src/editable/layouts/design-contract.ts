import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f6ee',
  '--slot4-page-text': '#112215',
  '--slot4-panel-bg': '#edf1e6',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#5c6758',
  '--slot4-soft-muted-text': '#7a8577',
  '--slot4-accent': '#005f02',
  '--slot4-accent-fill': '#427a43',
  '--slot4-accent-soft': '#c0b87a',
  '--slot4-highlight': '#f2e3bb',
  '--slot4-dark-bg': '#0c274d',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#e9e4d4',
  '--slot4-cream': '#f7f6ee',
  '--slot4-warm': '#fffaf0',
  '--slot4-gray': '#dde5d9',
  '--slot4-body-gradient': 'linear-gradient(180deg, #ffffff 0%, #f6f7f1 28%, #eef3ea 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[#d8ddcf]',
  darkBorder: 'border-white/20',
  shadow: 'shadow-[0_18px_45px_rgba(12,39,77,0.08)]',
  shadowStrong: 'shadow-[0_30px_90px_rgba(12,39,77,0.14)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(8,24,48,0.05),rgba(8,24,48,0.82))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10',
    sectionY: 'py-12 sm:py-16 lg:py-20',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start',
    rail: 'grid gap-5 md:grid-cols-2 xl:grid-cols-4',
    minRailCard: 'min-w-0',
  },
  type: {
    eyebrow: 'text-[11px] font-black uppercase tracking-[0.24em]',
    heroTitle: 'text-4xl font-black leading-[0.9] tracking-[-0.065em] sm:text-6xl lg:text-[5.9rem]',
    sectionTitle: 'text-3xl font-black leading-none tracking-[-0.05em] sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg}`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent-fill)]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--slot4-accent)] bg-white px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-[var(--slot4-accent)] transition hover:-translate-y-0.5 hover:bg-[var(--slot4-highlight)]',
    accent: 'inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(60,104,255,0.25)]',
  },
  media: {
    frame: `relative overflow-hidden rounded-[2rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_55px_rgba(12,39,77,0.13)]',
    fade: 'transition duration-300 hover:opacity-80',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a refined media-distribution presentation with deep navy framing, rich green accents, warm ivory surfaces, and premium spacing.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() or existing task URL builders for all post links so route aliases and task-specific detail pages remain functional.',
  'Support empty, missing-image, missing-summary, and missing-category cases gracefully.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a reference publication name or logo.',
] as const
