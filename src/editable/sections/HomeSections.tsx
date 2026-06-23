import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { getEditableExcerpt, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

const logoStrip = ['YAHOO!', 'FOX', 'BENZINGA', 'MarketWatch', 'AP', 'USA TODAY']
const reasons = [
  { title: 'Vast Media Network', body: 'Organize distributed stories with a polished layout that gives every release a premium, destination-site presentation.' },
  { title: 'Editorial Clarity', body: 'High-contrast hierarchy, measured spacing, and stronger summaries help busy readers scan quickly.' },
  { title: 'Turnkey Discovery', body: 'Search, category browsing, and connected article pages make the archive feel complete and easy to navigate.' },
]
const steps = [
  { title: 'Choose Your Focus', body: 'Open the latest stories, review categories, and move into the section that matches the update you need.' },
  { title: 'Review The Details', body: 'Every featured module now emphasizes the headline and supporting description without relying on cover images.' },
  { title: 'Share Or Continue', body: 'Move from overview to full article pages, related coverage, and supporting content without losing momentum.' },
]
const faqs = [
  { q: 'How does your media distribution service work?', a: 'Simply submit your content, choose a distribution package, and our team will distribute it to relevant media and publishing networks to maximize exposure.' },
  { q: 'Will my content appear on search engines?', a: 'Distributed content can be indexed by search engines, helping improve online visibility and making it easier for audiences to discover your news.' },
  { q: 'Is there a content review process?', a: 'Yes. All submissions are reviewed to ensure they meet editorial standards, legal requirements, and content guidelines.' },
  { q: 'What are the benefits of media distribution?', a: 'Media distribution helps increase brand awareness, improve online visibility, attract media attention, support SEO efforts, and reach a wider audience.' },
  { q: 'How do I get started?', a: 'Create an account, submit your content, select a distribution option, and our team will handle the rest of the process.'},
]

function TextPostCard({
  post,
  href,
  badge,
  className = '',
  dark = false,
}: {
  post: SitePost
  href: string
  badge: string
  className?: string
  dark?: boolean
}) {
  return (
    <Link href={href} className={`group rounded-[2rem] border p-6 transition duration-300 hover:-translate-y-1 ${dark ? 'border-white/10 bg-white/5 shadow-none' : 'border-[#dde3d7] bg-white shadow-[0_16px_38px_rgba(12,39,77,0.05)]'} ${className}`}>
      <p className={`text-[11px] font-black uppercase tracking-[0.22em] ${dark ? 'text-[#8fb0ff]' : 'text-[var(--slot4-accent)]'}`}>{badge}</p>
      <h3 className={`mt-4 font-black leading-[1.05] tracking-[-0.05em] ${dark ? 'text-2xl text-white sm:text-[2rem]' : 'text-3xl text-[#102113]'}`}>{post.title}</h3>
      <p className={`mt-4 text-sm leading-7 ${dark ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{getEditableExcerpt(post, 170) || 'Open the full release for more details and context.'}</p>
      <span className={`mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] ${dark ? 'text-[#c0b87a]' : 'text-[var(--slot4-accent)]'}`}>Open story <ArrowRight className="h-4 w-4" /></span>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const support = posts[1]
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: premium media distribution`

  return (
    <section className="premium-diagonal relative overflow-hidden border-t border-[#e7ebdf] bg-white">
      <div className={`${dc.shell.section} py-8 sm:py-10`}>
        <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-12">
          <div className="py-4 lg:py-10">
            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.home.hero.badge}</p>
            <h1 className={`${dc.type.heroTitle} mt-5 max-w-4xl text-[#101513]`}>{heroTitle}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href='/contact' className={dc.button.accent}>Get Me Featured <ArrowRight className="h-4 w-4" /></Link>
               </div>
          </div>

          <div className="relative">
            <div className="absolute bottom-5 right-[-1.25rem] z-0 hidden h-8 w-44 bg-[linear-gradient(135deg,#0c274d,#3c68ff)] lg:block" />
            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-[#14311b] bg-[linear-gradient(180deg,#0e2612_0%,#102d15_100%)] p-6 text-white shadow-[0_35px_80px_rgba(12,39,77,0.18)] sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(192,184,122,0.12),transparent_38%),linear-gradient(145deg,transparent_0_68%,rgba(255,255,255,0.04)_68%_78%,transparent_78%_100%)]" />
              <div className="relative border-b border-white/10 pb-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="editorial-brand text-3xl sm:text-4xl">{SITE_CONFIG.name}</span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#c0b87a]">Daily Brief</span>
                </div>
              </div>
              <div className="relative space-y-8 py-10">
                {lead ? (
                  <TextPostCard post={lead} href={postHref(primaryTask, lead, primaryRoute)} badge="Latest News" dark />
                ) : null}
                {support ? (
                  <TextPostCard post={support} href={postHref(primaryTask, support, primaryRoute)} badge="Featured Brief" dark />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = posts.slice(1, 5).length ? posts.slice(1, 5) : posts.slice(0, 4)

  return (
    <>
      <section className="border-y border-[#e7ebdf] bg-white">
        <div className={`${dc.shell.section} overflow-x-auto py-8`}>
          <div className="flex min-w-max items-center justify-between gap-10 text-3xl font-black tracking-[-0.05em] text-[#142438]">
            {logoStrip.map((logo) => <span key={logo} className="opacity-95">{logo}</span>)}
          </div>
        </div>
      </section>

      <section className="bg-[#eef3fb]">
        <div className={`${dc.shell.section} py-12 lg:py-16`}>
          {railPosts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {railPosts.map((post, index) => (
                <TextPostCard
                  key={post.id}
                  post={post}
                  href={postHref(primaryTask, post, primaryRoute)}
                  badge={`${taskLabel(primaryTask)} ${String(index + 1).padStart(2, '0')}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const ctaPost = posts[5] || posts[0]

  return (
    <>
      <section className="bg-[#eef2f8]">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Shape Success With Us</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#1a2b1c] sm:text-5xl">Why Media Distributors Choose A Premium Reading Experience</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {reasons.map((reason, index) => (
              <article key={reason.title} className="rounded-[2rem] border border-[#dbe2d5] bg-white p-8 shadow-[0_16px_36px_rgba(12,39,77,0.05)]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] text-2xl font-black text-white">
                  {index + 1}
                </div>
                <h3 className="mt-6 text-3xl font-black tracking-[-0.045em] text-[#102113]">{reason.title}</h3>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">{reason.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0c274d]">
        <div className={`${dc.shell.section} relative py-14 lg:py-20`}>
          <div className="absolute inset-y-0 right-[-10%] hidden w-[52%] bg-[linear-gradient(140deg,transparent_0_26%,rgba(255,255,255,0.06)_26%_42%,transparent_42%_100%)] lg:block" />
          <div className="relative z-10 grid gap-5 lg:grid-cols-[1fr_1.05fr]">
            <div className="rounded-[2rem] bg-white p-8 sm:p-10">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">See Distribution In Service</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#102113]">A homepage built to convert attention into deeper reading.</h2>
              <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">The composition follows the reference direction while remaining fully driven by live post content and existing routes.</p>
              <Link href={'/contact'} className="mt-8 inline-flex rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-8 py-4 text-lg font-black text-white">Take Off My Brand</Link>
            </div>

            {ctaPost ? (
              <TextPostCard post={ctaPost} href={postHref(primaryTask, ctaPost, primaryRoute)} badge="Featured Release" className="border-white/10 bg-white text-[#102113]" />
            ) : null}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const source = timeSections.flatMap((section) => section.posts).length ? timeSections.flatMap((section) => section.posts) : posts
  const recent = source.slice(0, 6)
  const featureLeft = source[6] || posts[2]
  const featureRight = source[7] || posts[3]
  const caseStudies = source.slice(8, 11).length ? source.slice(8, 11) : posts.slice(4, 7)
  const originalArticles = source.slice(11, 14).length ? source.slice(11, 14) : posts.slice(7, 10)

  return (
    <>
      <section className="bg-[#eef2f8]">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">3 Easy Steps</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#102113]">Move From Discovery To Full Release Detail</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="rounded-[2rem] border border-[#dbe2d5] bg-white p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] text-2xl font-black text-white">{index + 1}</span>
                  <h3 className="text-3xl font-black tracking-[-0.045em] text-[#102113]">{step.title}</h3>
                </div>
                <p className="mt-6 text-base leading-8 text-[var(--slot4-muted-text)]">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Recent Press Releases</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#102113]">Latest distributed coverage from the archive</h2>
          </div>
          {recent.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {recent.map((post, index) => (
                <TextPostCard
                  key={post.id}
                  post={post}
                  href={postHref(primaryTask, post, primaryRoute)}
                  badge={post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : `Story ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
          <div className="mt-10 flex justify-center">
            <Link href={primaryRoute} className="inline-flex rounded-full border border-[#102113] px-8 py-4 text-xl font-medium text-[#102113] transition hover:bg-[#102113] hover:text-white">More Press Releases</Link>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-[#0c274d]">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="grid gap-5 lg:grid-cols-2">
            {featureLeft ? <TextPostCard post={featureLeft} href={postHref(primaryTask, featureLeft, primaryRoute)} badge="Press Release" /> : null}
            {featureRight ? <TextPostCard post={featureRight} href={postHref(primaryTask, featureRight, primaryRoute)} badge={SITE_CONFIG.name} /> : null}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Our Case Studies</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#102113]">Practical stories readers can continue exploring</h2>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {caseStudies.map((post, index) => (
              <TextPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} badge={index === 0 ? 'Sean Lau' : index === 1 ? 'Editorial Desk' : 'Market Desk'} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef2f8]">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Original Articles</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#102113]">{SITE_CONFIG.name}&apos;s Original Articles</h2>
            <p className="mt-4 text-xl font-bold text-[var(--slot4-muted-text)]">Stay ahead in public relations and marketing.</p>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {originalArticles.map((post, index) => (
              <TextPostCard key={post.id} post={post} href={postHref(primaryTask, post, primaryRoute)} badge={`Read More ${String(index + 1).padStart(2, '0')}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} py-14 lg:py-20`}>
          <div className="text-center">
            <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Frequently Asked Questions</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.055em] text-[#102113]">Answers to common distribution and archive questions</h2>
            <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">Find answers to the most asked questions below.</p>
          </div>
          <div className="mx-auto mt-10 max-w-[900px] border border-[#dde3d7] bg-white">
            {faqs.map((item, index) => (
              <details key={item.q} className="border-t border-[#dde3d7] first:border-t-0" open={index === 0}>
                <summary className="cursor-pointer list-none px-5 py-4 text-left text-base font-bold text-[#102113] [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center justify-between gap-4">
                    <span>{item.q}</span>
                    <span className="text-xl text-[var(--slot4-soft-muted-text)]">{index === 0 ? '-' : '+'}</span>
                  </div>
                </summary>
                <div className="border-t border-[#edf0e7] px-5 py-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} py-8`}>
        <form action="/search" className="rounded-[2rem] border border-[#dde3d7] bg-[#0c274d] p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c6d4ff]">Search the archive</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">Explore every release, article, and update from {SITE_CONFIG.name}.</h2>
            </div>
            <label className="flex min-w-0 items-center overflow-hidden rounded-full bg-white text-[#102113] lg:min-w-[420px]">
              <Search className="ml-5 h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" placeholder="Search stories, topics, and companies" className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm outline-none" />
              <button className="bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white">Search</button>
            </label>
          </div>
        </form>
      </div>
    </section>
  )
}
