'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  profile: Sparkles,
  pdf: FileText,
  sbm: ArrowRight,
}

const fieldClass = 'h-[3.5rem] rounded-[1.1rem] border border-[#d8dfd2] bg-[#fbfcf8] px-4 text-sm font-semibold text-[#102113] outline-none transition placeholder:text-[#6f7b6d] focus:border-[var(--slot4-accent-fill)] focus:bg-white'
const textareaClass = 'rounded-[1.2rem] border border-[#d8dfd2] bg-[#fbfcf8] px-4 py-3 text-sm font-semibold text-[#102113] outline-none transition placeholder:text-[#6f7b6d] focus:border-[var(--slot4-accent-fill)] focus:bg-white'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

const highlights = [
  'Choose the live content section you want to publish into.',
  'Keep your headline, summary, links, and long-form content organized in one place.',
  'Save a clean local draft with the same supported fields already used by the site.',
]

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] px-4 py-16 text-[#102113] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-6xl gap-8 rounded-[2.4rem] border border-[#dce3d7] bg-white p-7 shadow-[0_30px_90px_rgba(15,23,42,0.08)] md:grid-cols-[0.95fr_1.05fr] md:p-10 lg:p-14">
            <div className="flex min-h-72 flex-col justify-center rounded-[2rem] bg-[#0c274d] p-8 text-white sm:p-10">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Lock className="h-10 w-10 opacity-85" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-[#c6d4ff]">{pagesContent.create.locked.badge}</p>
              <h1 className="editorial-brand mt-5 text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/75">{pagesContent.create.locked.description}</p>
            </div>
            <div className="self-center">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Publishing access</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] text-[#102113]">Sign in to open the publishing workspace.</h2>
              <div className="mt-8 grid gap-4">
                {highlights.map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-[#dce3d7] bg-[#f8faf6] p-4 text-sm leading-7 text-[var(--slot4-muted-text)]">
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-6 py-3 text-sm font-black text-white">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[#dce3d7] bg-white px-6 py-3 text-sm font-black">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[linear-gradient(180deg,#ffffff_0%,#f6f8f3_34%,#eef3ea_100%)] text-[#102113]">
        <section className="border-b border-[#dce3d7] bg-white">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.02fr_.98fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
                <h1 className="editorial-brand mt-5 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.055em] text-[#17345c] sm:text-7xl lg:text-8xl">{pagesContent.create.hero.title}</h1>
                <p className="mt-6 max-w-3xl text-base font-semibold leading-8 text-[var(--slot4-muted-text)]">{pagesContent.create.hero.description}</p>
              </div>
              <div className="rounded-[2rem] border border-[#dce3d7] bg-[#f8faf6] p-6">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Workspace note</p>
                <p className="mt-4 text-base leading-8 text-[var(--slot4-muted-text)]">Use this screen to prepare a structured draft with the same supported fields already wired into the editable experience.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
            <aside className="space-y-6">
              <div className="rounded-[2rem] bg-[#102716] p-8 text-white shadow-[0_22px_55px_rgba(12,39,77,0.12)]">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#c0b87a]">Current session</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.05em]">{session.name}</h2>
                <p className="mt-3 text-sm leading-7 text-white/70">{session.email}</p>
                <div className="mt-8 grid gap-3">
                  {highlights.map((item) => (
                    <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-white/72">{item}</div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#dce3d7] bg-white p-6 shadow-[0_16px_38px_rgba(12,39,77,0.05)]">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Select content type</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {enabledTasks.map((item) => {
                    const Icon = taskIcon[item.key] || FileText
                    const active = item.key === task
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setTask(item.key)}
                        className={`rounded-[1.4rem] border p-4 text-left transition ${active ? 'border-transparent bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] text-white shadow-[0_18px_40px_rgba(60,104,255,0.2)]' : 'border-[#dce3d7] bg-[#f8faf6] text-[#102113] hover:-translate-y-0.5'}`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="mt-3 block text-sm font-black">{item.label}</span>
                        <span className={`mt-1 block text-xs font-semibold ${active ? 'text-white/72' : 'text-[var(--slot4-muted-text)]'}`}>{item.description}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-[#dce3d7] bg-white p-6 shadow-[0_22px_55px_rgba(12,39,77,0.08)] sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e4e9de] pb-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Create {activeTask?.label || 'post'}</p>
                  <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#102113]">{pagesContent.create.formTitle}</h2>
                </div>
                <span className="rounded-full border border-[#dce3d7] bg-[#f8faf6] px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">{activeTask?.label || 'Post'}</span>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${textareaClass} min-h-28`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${textareaClass} min-h-56`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-[1.3rem] border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,var(--slot4-accent-fill),#3c68ff)] px-6 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
