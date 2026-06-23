import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

const notes = [
  'Access the publishing workspace and saved account session.',
  'Continue browsing updates, submissions, and archive pages.',
  'Keep the same lightweight local-auth behavior already supported.',
]

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center rounded-[2rem] bg-[#0c274d] p-8 text-white shadow-[0_24px_60px_rgba(12,39,77,0.16)] sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c6d4ff]">{pagesContent.auth.login.badge}</p>
            <h1 className="editorial-brand mt-5 max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{pagesContent.auth.login.title}</h1>
            <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-white/75">{pagesContent.auth.login.description}</p>
            <div className="mt-10 grid gap-4">
              {notes.map((note) => (
                <div key={note} className="flex items-start gap-3 rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#c0b87a]" />
                  <p className="text-sm leading-7 text-white/75">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border border-[#dce3d7] bg-white p-7 shadow-[0_18px_45px_rgba(12,39,77,0.06)] sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Member access</p>
            <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#102113]">{pagesContent.auth.login.formTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">Sign in to continue into your publishing space.</p>
            <EditableLocalLoginForm />
            <p className="mt-6 border-t border-[#e4e9de] pt-5 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
            <Link href="/search" className="mt-4 inline-flex items-center gap-2 text-sm font-black text-[#17345c]">Browse public archive <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
