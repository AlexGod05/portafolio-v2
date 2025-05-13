import cvEnglishData from '../data/cv_english.json'
import type { CV } from '@/types/cv'
import cvData from '../data/cv.json'

export async function getCVData(): Promise<CV> {
  // En el servidor, siempre devolvemos los datos en español
  if (typeof window === 'undefined') {
    return cvData as CV
  }

  // En el cliente, usamos el idioma guardado en localStorage
  const language = localStorage.getItem('language') || 'es'
  const data = language === 'en' ? cvEnglishData : cvData
  return data as CV
}

export function getCurrentLanguage(): string {
  if (typeof window === 'undefined') {
    return 'es'
  }
  return localStorage.getItem('language') || 'es'
}

export function setLanguage(language: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
    window.location.reload()
  }
} 