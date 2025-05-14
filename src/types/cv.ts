export interface CV {
  basics: Basics
  work: Array<Work>
  volunteer: Array<Volunteer>
  education: Array<Education>
  awards: Array<Awards>
  certificates: Array<Certificates>
  publications: Array<Publications>
  skills: Array<Skills>
  languages: Array<Languages>
  interests: Array<Interests>
  references: Array<References>
  projects: Array<Projects>
}

export interface Basics {
  name: string
  label: string
  image: string
  email: string
  phone: string
  url: string
  summary: string
  location: Location
  profiles: Array<Profile>
}

export interface Location {
  address: string
  postalCode: string
  city: string
  department: string
  countryCode: string
  region: string
}

export interface Profile {
  network: string
  username: string
  url: string
}

export interface Work {
  name: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: Array<string>
}

export interface Volunteer {
  organization: string
  position: string
  url: string
  startDate: string
  endDate: string
  summary: string
  highlights: Array<string>
}

export interface Education {
  institution: string
  url: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  score?: string
  courses: Array<string>
}

export interface Awards {
  title: string
  date: string
  awarder: string
  summary: string
}

export interface Certificates {
  name: string
  date: string
  issuer: string
  url: string
}

export interface Publications {
  name: string
  publisher: string
  releaseDate: string
  url: string
  summary: string
}

export interface Skills {
  name: string
  keywords: Array<string>
}

export interface Languages {
  fluency: string
}

export interface Interests {
  name: string
  keywords: Array<string>
}

export interface References {
  name: string
  reference: string
}

export interface Projects {
  name: string
  client?: string
  company: string
  startYear: string
  endYear?: string
  description: string
  highlights: Array<string>
  url?: string
  github?: string
  icon: string
} 