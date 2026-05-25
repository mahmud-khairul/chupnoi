'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      router.push('/admin')
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Invalid credentials')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="text-[12px] text-brand-red font-bold tracking-[3px] uppercase mb-3 flex items-center justify-center gap-1.5">
            <svg viewBox="0 0 20 20" fill="currentColor" width="10" height="10">
              <path d="M10 1L3 4v5c0 4.4 3 8.5 7 9.9C14 17.5 17 13.4 17 9V4L10 1z" />
            </svg>
            SafeGuard BD
          </div>
          <h1 className="font-display text-[32px] font-black text-brand-cream tracking-tight">
            Admin Access
          </h1>
          <p className="text-[12px] text-brand-muted mt-2 font-light">
            Restricted to authorized reviewers only
          </p>
        </div>

        {/* Card */}
        <div className="border border-brand-border" style={{ background: '#0f0f0f' }}>
          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            <div>
              <label className="block text-[10px] font-bold tracking-[1.5px] text-brand-muted uppercase mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                autoComplete="username"
                className="w-full border border-brand-border px-4 py-3 text-[16px] text-brand-cream bg-brand-black outline-none focus:border-[#444] transition-colors font-sans placeholder:text-[#333]"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold tracking-[1.5px] text-brand-muted uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full border border-brand-border px-4 py-3 text-[16px] text-brand-cream bg-brand-black outline-none focus:border-[#444] transition-colors font-sans placeholder:text-[#333]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="border px-4 py-3 text-[12px] text-brand-red"
                style={{ borderColor: 'rgba(192,57,43,0.3)', background: 'rgba(192,57,43,0.06)' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-red text-brand-cream py-3.5 text-[11px] font-bold tracking-[1.5px] uppercase hover:bg-brand-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div className="border-t border-brand-border px-8 py-4">
            <p className="text-[11px] text-[#333] text-center font-light">
              This panel is for authorized administrators only.
              Unauthorized access attempts are logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
