'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Mail, Menu, Phone, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navLinks = [
  { label: 'PR Services', href: '/contact' }
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfe5dc] bg-white/95 text-[#102113] backdrop-blur">
      <div className="bg-[#0c274d] text-white">
        
       
      </div>

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <div className="grid min-h-[116px] grid-cols-[auto_1fr_auto] items-center gap-4">
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d7dfd1] lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link href="/" className="editorial-brand flex items-center gap-4 whitespace-nowrap justify-self-start text-3xl font-medium tracking-[-0.06em] text-[#17345c] sm:text-4xl lg:text-5xl">
            <img src="/favicon.png" width="84" height="84" alt={`${SITE_CONFIG.name} logo`} className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-20 lg:w-20" />
            <span className="truncate">{SITE_CONFIG.name}</span>
          </Link>
           <form action="/search" className="flex w-full max-w-[320px] items-center rounded-full border border-[#d7dfd1] bg-[#f7f8f3]">
              <Search className="ml-4 h-4 w-4 text-[var(--slot4-soft-muted-text)]" />
              <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            </form> 
        
          <div className="hidden items-center justify-end gap-8 lg:flex">
            <nav className="flex items-center gap-8">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} className="inline-flex items-center gap-2 text-lg font-medium text-[#102113] transition hover:text-[var(--slot4-accent)]">
                  {item.label}
                 </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {session ? (
                <>
                  <button type="button" onClick={logout} className="text-lg font-medium">Log out</button>
                </>
              ) : (
                <Link href="/login" className="text-lg font-medium">Sign In</Link>
              )}
              <Link href={session ? '/create' : '/signup'} className="inline-flex rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-7 py-4 text-xl font-medium text-white shadow-[0_18px_35px_rgba(60,104,255,0.25)]">
                {session ? 'Publish' : 'Sign Up'}
              </Link>
            </div>
          </div>

         </div>
      </div>

      {open ? (
        <div className="border-t border-[#e7ece4] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setOpen(false)} className="rounded-[1.25rem] border border-[#d7dfd1] px-4 py-3 text-base font-bold">
                {item.label}
              </Link>
            ))}
            
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-[1.25rem] border border-[#d7dfd1] px-4 py-3 text-base font-bold">Create</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-[1.25rem] border border-[#d7dfd1] px-4 py-3 text-left text-base font-bold">Log out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1.25rem] border border-[#d7dfd1] px-4 py-3 text-base font-bold">Sign In</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[1.25rem] bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-4 py-3 text-base font-bold text-white">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
