'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Lang = 'bn' | 'en'

type LanguageContextType = {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'bn',
  toggle: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('bn')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'en' || stored === 'bn') setLang(stored)
  }, [])

  function toggle() {
    setLang(prev => {
      const next = prev === 'bn' ? 'en' : 'bn'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
