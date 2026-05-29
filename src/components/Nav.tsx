'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

interface NavProps {
  showAdminLinks?: boolean
}

function LangToggle() {
  const { lang, toggle } = useLanguage()
  const isEn = lang === 'en'

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      className="flex-shrink-0 cursor-pointer bg-transparent border-none p-0 select-none"
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          lineHeight: 1,
          color: !isEn ? '#FFFDF5' : '#555',
          transition: 'color 0.15s',
        }}
      >
        বাং
      </span>

      {/* pill track */}
      <div
        style={{
          position: 'relative',
          width: 36,
          height: 20,
          borderRadius: 10,
          flexShrink: 0,
          background: isEn ? '#c0392b' : '#2a2a2a',
          border: '1px solid #444',
          transition: 'background 0.2s',
        }}
      >
        {/* knob */}
        <div
          style={{
            position: 'absolute',
            top: 2,
            left: isEn ? 16 : 2,
            width: 14,
            height: 14,
            borderRadius: '50%',
            background: '#FFFDF5',
            transition: 'left 0.2s ease',
          }}
        />
      </div>

      <span
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          lineHeight: 1,
          color: isEn ? '#FFFDF5' : '#555',
          transition: 'color 0.15s',
        }}
      >
        EN
      </span>
    </button>
  )
}

export default function Nav({ showAdminLinks = false }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang } = useLanguage()
  const T = useT(lang)

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
        <Link href="/" className="no-underline flex-shrink-0">
          <Image src="/logo.png" alt="চুপ নই" width={92} height={56} priority />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {T.nav.links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-muted hover:text-brand-cream text-[14px] font-medium tracking-wider uppercase px-3 py-1.5 border border-transparent hover:border-brand-border transition-all no-underline"
            >
              {link.label}
            </Link>
          ))}
          {showAdminLinks && (
            <>
              <Link href="/admin" className="text-brand-cream text-[14px] font-medium tracking-wider uppercase px-3 py-1.5 border border-brand-border no-underline">
                {T.nav.adminPanel}
              </Link>
              <button
                onClick={handleSignOut}
                className="text-brand-muted text-[14px] font-medium tracking-wider uppercase px-3 py-1.5 bg-transparent border-none cursor-pointer hover:text-brand-cream"
              >
                {T.nav.signOut}
              </button>
            </>
          )}
          <div className="ml-2 pl-3" style={{ borderLeft: '1px solid #2a2a2a' }}>
            <LangToggle />
          </div>
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <LangToggle />
          <button
            className="flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-1"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-brand-cream origin-center transition-all duration-200 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-brand-cream transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-brand-cream origin-center transition-all duration-200 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-border" style={{ background: 'rgba(10,10,10,0.99)' }}>
          <div className="px-4 py-3 flex flex-col">
            {T.nav.links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-brand-muted hover:text-brand-cream text-[14px] font-medium tracking-wider uppercase px-2 py-3 border-b border-brand-border/40 transition-colors no-underline"
              >
                {link.label}
              </Link>
            ))}
            {showAdminLinks && (
              <>
                <Link
                  href="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="text-brand-cream text-[14px] font-medium tracking-wider uppercase px-2 py-3 border-b border-brand-border/40 no-underline"
                >
                  {T.nav.adminPanel}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-brand-muted text-left text-[14px] font-medium tracking-wider uppercase px-2 py-3 bg-transparent border-none cursor-pointer hover:text-brand-cream"
                >
                  {T.nav.signOut}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
