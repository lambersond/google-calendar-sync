import { memo, useCallback } from 'react'
import { endOfDay, endOfToday, max, min, startOfToday } from 'date-fns'
import { Calendar } from '@/components/calendar/calendar'
import { setItem } from '@/utils/storage'

export function _CalendarDatePicker() {
  const handleOnDateChange = useCallback((dates: [Date | null, Date | null]) => {
    if (dates[0] && dates[1]) {
      setItem('calendarParams', {
        timeMin: min(dates as Date[]).toISOString(),
        timeMax: max(dates as Date[]).toISOString(),
      })
    } else if (dates.filter(Boolean).length === 1) {
      const date = dates.filter(Boolean)[0] as Date
      setItem('calendarParams', {
        timeMin: date.toISOString(),
        timeMax: endOfDay(date).toISOString(),
      })
    } else {
      setItem('calendarParams', {
        timeMin: startOfToday().toISOString(),
        timeMax: endOfToday().toISOString(),
      })
    }
  }, [])

  return (
    <div className='flex justify-center w-full'>
      <Calendar onChange={handleOnDateChange} />
    </div>
  )
}

export const CalendarDatePicker = memo(_CalendarDatePicker)
