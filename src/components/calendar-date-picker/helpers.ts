import { endOfDay, endOfToday, max, min, startOfToday } from 'date-fns'
import { CALENDAR_PARAMS } from '@/constants'
import { setItem } from '@/utils/storage'

export const setDateRange = (dates: [Date | null, Date | null]) => {
  if (dates[0] && dates[1]) {
    setItem(CALENDAR_PARAMS, {
      timeMin: min(dates as Date[]).toISOString(),
      timeMax: endOfDay(max(dates as Date[])).toISOString(),
    })
  } else if (dates.filter(Boolean).length === 1) {
    const date = dates.filter(Boolean)[0] as Date
    setItem(CALENDAR_PARAMS, {
      timeMin: min([startOfToday(), date]).toISOString(),
      timeMax: endOfDay(max([date, endOfToday()])).toISOString(),
    })
  } else {
    setItem(CALENDAR_PARAMS, {
      timeMin: startOfToday().toISOString(),
      timeMax: endOfToday().toISOString(),
    })
  }
}
