'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { useT } from '@/lib/translations'

const SITE_URL = 'https://chupnoi.vercel.app'
const SHARE_TEXT = 'চুপ নই। বাংলাদেশ শিশু সুরক্ষা উদ্যোগ — আমরা দেখছি। আমরা বলবো।'

const shareLinks = [
  {
    name: 'Facebook',
    color: '#1877F2',
    href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    color: '#25D366',
    href: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + ' ' + SITE_URL)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.571a.5.5 0 0 0 .372.607l5.923-1.554A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.95 9.95 0 0 1-5.355-1.557l-.383-.227-3.962 1.04 1.055-3.847-.25-.396A9.952 9.952 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
]

export default function Footer() {
  const { lang } = useLanguage()
  const T = useT(lang)

  return (
    <footer className="border-t border-brand-border bg-brand-black">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
        <div>
          <Image src="/footer-logo.png" alt="চুপ নই" width={120} height={72} />
        </div>
        <div className="sm:text-center sm:max-w-[380px]">
          <p className="text-[11px] text-[#333] leading-relaxed mb-4">
            {T.footer.disclaimer}
          </p>
          <p className="text-[12px] text-brand-muted mb-2">{T.footer.contactPrompt}</p>
          <p className="text-[11px] text-[#555] mb-1">
            <a href="https://surl.lu/wcnobf" target="_blank" rel="noopener noreferrer" className="hover:text-brand-cream transition-colors no-underline">Facebook group: https://surl.lu/wcnobf</a>
          </p>
          <p className="text-[11px] text-[#555]">
            <a href="mailto:chupnoi.info@gmail.com" className="hover:text-brand-cream transition-colors no-underline">Email: chupnoi.info@gmail.com</a>
          </p>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-[#333] font-bold tracking-widest uppercase mr-1">{T.footer.share}</span>
            {shareLinks.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="p-2 flex items-center justify-center border transition-all"
                style={{ color: s.color, borderColor: `${s.color}44` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = s.color)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = `${s.color}44`)}
              >
                {s.icon}
              </a>
            ))}
          </div>
          <Link
            href="/admin/login"
            className="flex items-center gap-1.5 text-[#444] text-[10px] font-bold tracking-widest uppercase border border-[#222] px-3 py-2 no-underline hover:text-[#666] hover:border-[#333] transition-all"
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  )
}
