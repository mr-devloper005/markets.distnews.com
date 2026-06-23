'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="border-b border-[#dce3d7] bg-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <h1 className="editorial-brand max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#17345c] sm:text-7xl lg:text-8xl">{pagesContent.contact.title}</h1>
                <p className="mt-6 max-w-2xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.contact.description}</p>
              </div>
              <div className="rounded-[2rem] border border-[#dce3d7] bg-[#f8faf6] p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Response overview</p>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">Use this page to route publishing questions, support requests, or partnership outreach through a cleaner contact experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <aside className="grid gap-5">
              {desks.map((desk, index) => (
                <div key={desk.title} className="rounded-[2rem] border border-[#dce3d7] bg-[#0f2414] p-7 text-white shadow-[0_18px_45px_rgba(12,39,77,0.12)]">
                  <div className="flex items-center justify-between">
                    <desk.icon className="h-5 w-5 text-[#c0b87a]" />
                    <span className="text-xs font-black text-white/45">0{index + 1}</span>
                  </div>
                  <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">{desk.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-white/68">{desk.body}</p>
                </div>
              ))}
            </aside>
            <div className="rounded-[2rem] border border-[#dce3d7] bg-white p-6 shadow-[0_18px_45px_rgba(12,39,77,0.06)] sm:p-10 lg:p-14">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Send a message</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.045em] text-[#102113]">{pagesContent.contact.formTitle}</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--slot4-muted-text)]">Tell us what you need and we will help direct it to the right lane.</p>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
