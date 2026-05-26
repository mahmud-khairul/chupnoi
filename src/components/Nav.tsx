'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavProps {
  showAdminLinks?: boolean
}

const navLinks = [
  { href: '/the-problem', label: 'সমস্যা' },
  { href: '/registry', label: 'তালিকা' },
  { href: '/#what-we-stand-for', label: 'আমাদের অবস্থান' },
  { href: '/#who-are-we', label: 'আমরা কারা' },
  { href: '/what-we-want', label: 'আমাদের দাবি' },
  { href: '/report', label: 'রিপোর্ট করুন' },
  { href: '/support-us', label: 'সহায়তা' },
  { href: '/seek-help', label: 'হাত বারান' },
]

export default function Nav({ showAdminLinks = false }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

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
          {navLinks.map(link => (
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
                Admin Panel
              </Link>
              <button
                onClick={handleSignOut}
                className="text-brand-muted text-[14px] font-medium tracking-wider uppercase px-3 py-1.5 bg-transparent border-none cursor-pointer hover:text-brand-cream"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-brand-cream origin-center transition-all duration-200 ${menuOpen ? 'translate-y-[6.5px] rotate-45' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-brand-cream transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-brand-cream origin-center transition-all duration-200 ${menuOpen ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-brand-border" style={{ background: 'rgba(10,10,10,0.99)' }}>
          <div className="px-4 py-3 flex flex-col">
            {navLinks.map(link => (
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
                  Admin Panel
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-brand-muted text-left text-[14px] font-medium tracking-wider uppercase px-2 py-3 bg-transparent border-none cursor-pointer hover:text-brand-cream"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
