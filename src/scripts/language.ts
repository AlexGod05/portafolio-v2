export type Language = 'es' | 'en'

export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage) return savedLanguage
    
    // Por defecto, usar español
    return 'es'
  }
  return 'es'
}

export function setLanguage(language: Language) {
  localStorage.setItem('language', language)
  document.documentElement.lang = language
  window.location.reload()
}

export function toggleLanguage() {
  const currentLanguage = localStorage.getItem('language') as Language || 'es'
  const newLanguage = currentLanguage === 'es' ? 'en' : 'es'
  setLanguage(newLanguage)
  return newLanguage
} 