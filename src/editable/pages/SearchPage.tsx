import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group rounded-[2rem] border border-[#dce3d7] bg-white p-6 shadow-[0_16px_38px_rgba(12,39,77,0.05)] transition duration-300 hover:-translate-y-1 ${strong ? 'md:col-span-2' : ''}`}>
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white">{taskLabel}</span>
        <span className="text-[11px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2 className="mt-5 text-3xl font-black leading-[1.03] tracking-[-0.04em] text-[#102113]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">
        {summary || 'Open the result to read the full update and supporting details.'}
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4" /></span>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="border-b border-[#dce3d7] bg-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1fr_.92fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
                <h1 className="editorial-brand mt-5 text-5xl font-black leading-[0.9] tracking-[-0.055em] text-[#17345c] sm:text-7xl lg:text-8xl">{pagesContent.search.hero.title}</h1>
                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.search.hero.description}</p>
              </div>
              <div className="rounded-[2rem] border border-[#dce3d7] bg-[#f8faf6] p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Search overview</p>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">Filter the live archive by keyword, category, and content type while keeping the layout aligned with the rest of the site.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8">
          <form action="/search" className="rounded-[2rem] border border-[#dce3d7] bg-white p-6 shadow-[0_16px_38px_rgba(12,39,77,0.05)] sm:p-8">
            <input type="hidden" name="master" value="1" />
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[#d8dfd2] bg-[#fbfcf8] px-4 py-3">
              <Search className="h-5 w-5 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-[#6f7b6d]" />
            </label>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-[1.1rem] border border-[#d8dfd2] bg-[#fbfcf8] px-4 py-3">
                <Filter className="h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
                <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[#6f7b6d]" />
              </label>
              <select name="task" defaultValue={task} className="rounded-[1.1rem] border border-[#d8dfd2] bg-[#fbfcf8] px-4 py-3 text-sm font-black outline-none">
                <option value="">All content types</option>
                {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
              </select>
            </div>
            <button className="mt-4 inline-flex h-14 w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-6 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5" type="submit">Search archive</button>
          </form>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.04em] text-[#102113]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/article" className="inline-flex items-center gap-2 rounded-full border border-[#dce3d7] bg-white px-5 py-3 text-xs font-black uppercase">Browse latest <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {results.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-[#dce3d7] bg-white p-10 text-center">
              <p className="text-2xl font-black tracking-[-0.04em] text-[#102113]">No matching posts found.</p>
              <p className="mt-3 text-sm font-semibold text-[var(--slot4-muted-text)]">Try a different keyword, task type, or category.</p>
            </div>
          )}
        </section>
      </main>
    </EditableSiteShell>
  )
}
