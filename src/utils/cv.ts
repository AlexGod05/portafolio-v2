import cvData from '../data/cv.json'
import type { CV } from '@/types/cv'

export async function getCVData(): Promise<CV> {
  return cvData as CV
} 