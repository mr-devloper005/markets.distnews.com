import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="border-b border-[#dce3d7] bg-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <h1 className="editorial-brand max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#17345c] sm:text-7xl lg:text-8xl">
                  {pagesContent.about.title}
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.description}</p>
              </div>
              <div className="rounded-[2rem] border border-[#dce3d7] bg-[#f8faf6] p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Why this publication</p>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">
                  {SITE_CONFIG.name} is arranged for discoverability, credible presentation, and a smoother reading path across releases, updates, and supporting content.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <article className="rounded-[2rem] border border-[#dce3d7] bg-white p-7 shadow-[0_18px_45px_rgba(12,39,77,0.06)] sm:p-10 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
              <div className="article-content mt-8 space-y-6">
                {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {pagesContent.about.values.slice(0, 2).map((value) => (
                  <div key={value.title} className="rounded-[1.5rem] border border-[#dce3d7] bg-[#f8faf6] p-5">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                      <p className="text-base font-black text-[#102113]">{value.title}</p>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside className="grid gap-5">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className="rounded-[2rem] border border-[#dce3d7] bg-white p-7 shadow-[0_16px_38px_rgba(12,39,77,0.05)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">0{index + 1}</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em] text-[#102113]">{value.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="bg-[#0c274d] text-white">
          <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#c6d4ff]">Explore more</p>
              <h2 className="editorial-brand mt-3 max-w-3xl text-4xl font-black leading-none sm:text-5xl">Read the stories shaping the conversation.</h2>
            </div>
            <Link href="/search" className="inline-flex w-fit items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-6 py-4 text-xs font-black uppercase tracking-[0.18em]">Explore the archive <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
