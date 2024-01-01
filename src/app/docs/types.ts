export type Document = {
  effectiveDate: string
  lastUpdated: string
  title: string
  content: Section[]
}

type Section = {
  title: string
  content: string[]
}
