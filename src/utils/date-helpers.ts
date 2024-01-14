import type { EventDateTime } from '@/types'

export const getTimeFromISOString = (timeStr: string) => timeStr.split('T')[1].split('-')[0]

export const formatToDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-')
  return new Date(+year, +month - 1, +day, 0, 0, 0)
}

export const parseEventDateFieldToDateTime = (eventDateTime: EventDateTime | undefined) => {
  return new Date(eventDateTime?.dateTime ?? formatToDate(eventDateTime?.date as string))
}

export const isMidnightToMidnight = (start: Date, end: Date) => {
  return isMidnight(start) && isMidnight(end)
}

const isMidnight = (date: Date) => date.toLocaleTimeString() === '12:00:00 AM'
