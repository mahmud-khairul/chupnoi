import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-black">
      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
        <div>
          <Image src="/footer-logo.png" alt="চুপ নই" width={120} height={72} />
        </div>
        <p className="text-[11px] text-[#333] sm:max-w-[380px] sm:text-center leading-relaxed">
          All information is sourced from public court records and verified submissions.
          If you believe a record is inaccurate, contact us for review.
        </p>
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
    </footer>
  )
}
