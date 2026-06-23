import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo', 'avatar']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Latest'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Lead story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group block min-w-0 overflow-hidden rounded-[2rem] border border-[#d7dfd1] bg-white ${dc.motion.lift}`}>
      <div className="relative aspect-[16/10] min-h-[430px] overflow-hidden">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,39,77,0.06),rgba(12,39,77,0.9))]" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
          <span className="inline-flex rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em]">{label}</span>
          <h3 className="mt-5 max-w-4xl text-4xl font-black leading-[.97] tracking-[-.055em] sm:text-6xl">{post.title}</h3>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/82 sm:text-base">{getEditableExcerpt(post, 190)}</p>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden rounded-[1.9rem] border border-[#d7dfd1] bg-white ${dc.motion.lift}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[.18em] text-[var(--slot4-accent)]">
          <span>{getEditableCategory(post)}</span>
          <span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="mt-3 line-clamp-3 text-xl font-black leading-[1.02] tracking-[-.04em]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[42px_1fr] gap-4 border-t border-[#d7dfd1] py-4 first:border-t-0">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-highlight)] text-sm font-black text-[var(--slot4-accent)]">{index + 1}</span>
      <div className="min-w-0">
        <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.18em] text-[var(--slot4-soft-muted-text)]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)}</p>
        <h3 className="mt-2 line-clamp-3 text-base font-black leading-tight tracking-[-.03em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 gap-5 border-t border-[#d7dfd1] py-6 sm:grid-cols-[240px_minmax(0,1fr)] sm:gap-7">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0 pt-1">
        <p className="text-[11px] font-black uppercase tracking-[.2em] text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="mt-3 line-clamp-3 text-3xl font-black leading-[1.02] tracking-[-.05em] group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-[var(--slot4-accent)]">Read story <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export function HorizontalFeatureCard({ post, href, badge }: { post: SitePost; href: string; badge: string }) {
  return (
    <Link href={href} className={`group grid overflow-hidden rounded-[2rem] border border-[#d7dfd1] bg-white lg:grid-cols-[1.05fr_.95fr] ${dc.motion.lift}`}>
      <div className="relative min-h-[260px] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8">
        <span className="text-[10px] font-black uppercase tracking-[.22em] text-[var(--slot4-accent)]">{badge}</span>
        <h3 className="mt-3 text-3xl font-black leading-[1.02] tracking-[-.05em]">{post.title}</h3>
        <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
      </div>
    </Link>
  )
}

export function ImageFirstCard({ post, href, badge }: { post: SitePost; href: string; badge: string }) {
  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border border-[#d7dfd1] bg-white ${dc.motion.lift}`}>
      <div className="relative aspect-[5/6] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(12,39,77,0.86))]" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <span className="text-[10px] font-black uppercase tracking-[.2em] text-white/72">{badge}</span>
          <h3 className="mt-2 line-clamp-3 text-2xl font-black leading-tight tracking-[-.04em]">{post.title}</h3>
        </div>
      </div>
    </Link>
  )
}
