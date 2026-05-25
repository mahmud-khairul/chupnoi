'use client'
import Link from 'next/link'
import { useState } from 'react'

interface NavProps {
  showAdminLinks?: boolean
}

export default function Nav({ showAdminLinks = false }: NavProps) {
  const [lang, setLang] = useState<'en' | 'bn'>('en')

  async function handleSignOut() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <nav
      style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(12px)' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-brand-border"
    >
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4 gap-3">
        <Link href="/" className="font-display text-xl font-black text-brand-cream no-underline whitespace-nowrap">
          চুপ <span className="text-brand-red">নই</span>
        </Link>

        <div className="flex items-center gap-1">
          <Link href="/registry" className="text-brand-muted hover:text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline">
            Registry
          </Link>
          <Link href="/#what-we-stand-for" className="text-brand-muted hover:text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline">
            What We Stand For
          </Link>
          <Link href="/#who-are-we" className="text-brand-muted hover:text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline">
            Who Are We
          </Link>
          <Link href="/#what-we-want" className="text-brand-muted hover:text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline">
            What We Want
          </Link>
          <Link href="/report" className="text-brand-muted hover:text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline">
            Report Abuse
          </Link>
          {showAdminLinks && (
            <>
              <Link href="/admin" className="text-brand-cream text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 border border-brand-border no-underline">
                Admin Panel
              </Link>
              <button
                onClick={handleSignOut}
                className="text-brand-muted text-[11px] font-medium tracking-wider uppercase px-3 py-1.5 bg-transparent border-none cursor-pointer hover:text-brand-cream"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        <div className="flex border border-brand-border overflow-hidden">
          <button
            onClick={() => { setLang('bn'); localStorage.setItem('lang', 'bn') }}
            className={`border-none px-3 py-1.5 text-[11px] font-bold tracking-widest cursor-pointer transition-all ${lang === 'bn' ? 'bg-brand-cream text-brand-black' : 'bg-transparent text-brand-muted'}`}
          >
            বাং
          </button>
          <div className="w-px bg-brand-border" />
          <button
            onClick={() => { setLang('en'); localStorage.setItem('lang', 'en') }}
            className={`border-none px-3 py-1.5 text-[11px] font-bold tracking-widest cursor-pointer transition-all ${lang === 'en' ? 'bg-brand-cream text-brand-black' : 'bg-transparent text-brand-muted'}`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
