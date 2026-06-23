'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const [year, setYear] = useState('')
  const { session, logout } = useEditableLocalAuthSession()

  useEffect(() => {
    setYear(String(new Date().getFullYear()))
  }, [])

  return (
    <footer className="bg-[#0c274d] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-10 lg:py-20">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Link href="/" className="editorial-brand flex items-center gap-4 whitespace-nowrap text-2xl text-white sm:text-3xl lg:text-4xl">
            <img src="/favicon.png" width="92" height="92" alt={`${SITE_CONFIG.name} logo`} className="h-16 w-16 shrink-0 object-contain sm:h-20 sm:w-20 lg:h-24 lg:w-24" />
            <span className="truncate">{SITE_CONFIG.name} <span className="text-[#8fb0ff]"></span></span>
          </Link>
          
        </div>

        <div className="mt-10 rounded-[2rem] bg-white p-8 text-[#102113] shadow-[0_25px_60px_rgba(0,0,0,0.12)] sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr_.9fr]">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Important</p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--slot4-muted-text)]">
                <span>Media distribution updates</span>
                <span>Release formatting guidance</span>
                <span>Background and category discovery</span>
                <span>Public story archive</span>
                <span>Search-ready editorial navigation</span>
              </div>
              <Link href={'/contact'} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-7 py-4 text-lg font-black text-white">
                Get Me Featured
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#3c68ff]">Quicklinks</p>
              <div className="mt-5 grid gap-3 text-sm leading-7 text-[var(--slot4-muted-text)]">
                <Link href="/about">About Us</Link>
                <Link href="/search">Directory</Link>
                <Link href="/contact">Contact</Link>
                 </div>
            </div>

            
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-white/65">
          <p>{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <p>(c) {year || '----'} {SITE_CONFIG.name}. {globalContent.footer?.bottomNote || 'Premium editorial distribution experience.'}</p>
        </div>
      </div>
    </footer>
  )
}
