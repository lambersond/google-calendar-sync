import { Dispatch, SetStateAction } from 'react'

export type NullDate = Date | null
export type Range = [NullDate, NullDate]

export type RangeType = {
  start: NullDate
  end: NullDate
  potentialEnd: NullDate
}

export type DayData = {
  range: Range
  potentialRange: Range
}

export type DayApi = {
  setRange: Dispatch<SetStateAction<RangeType>>
  onChange(range: Range): void
}

export type CurrentMonth = [Date, Dispatch<SetStateAction<Date>>]

export type CalendarProviderProps = Readonly<{
  children: React.ReactNode
  startingDate?: Date
  onChange: (range: [NullDate, NullDate]) => void
}>
