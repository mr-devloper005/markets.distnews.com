import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

const benefits = [
  'Create and manage submissions through the existing publishing workflow.',
  'Keep access to archive browsing, account session, and site tools.',
  'Start with the same supported routes and local-auth flow already in place.',
]

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[.98fr_1.02fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center rounded-[2rem] border border-[#dce3d7] bg-white p-7 shadow-[0_18px_45px_rgba(12,39,77,0.06)] sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Create account</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#102113]">{pagesContent.auth.signup.formTitle}</h1>
            <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">Set up your account and move straight into the publishing workspace.</p>
            <EditableLocalSignupForm />
            <p className="mt-6 border-t border-[#e4e9de] pt-5 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] bg-[#102716] p-8 text-white shadow-[0_24px_60px_rgba(12,39,77,0.14)] sm:p-12 lg:p-16">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#c0b87a]">{pagesContent.auth.signup.badge}</p>
            <h2 className="editorial-brand mt-5 max-w-xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-8xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-6 max-w-lg text-sm font-semibold leading-8 text-white/68">{pagesContent.auth.signup.description}</p>
            <div className="mt-10 grid gap-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#c0b87a]" />
                  <p className="text-sm leading-7 text-white/76">{benefit}</p>
                </div>
              ))}
            </div>
            <Link href="/search" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#c6d4ff]">Explore the public archive <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
