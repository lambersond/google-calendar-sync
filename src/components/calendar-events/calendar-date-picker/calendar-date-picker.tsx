import { memo, useCallback } from 'react'
import { Calendar } from '@/components/calendar/calendar'
import { setItem } from '@/utils/storage'

export function _CalendarDatePicker() {
  const handleOnDateChange = useCallback((dates: [Date | null, Date | null]) => {
    setItem('calendarParams', {
      timeMin: dates[0]?.toISOString() ?? new Date().toISOString(),
      timeMax:
        dates[1]?.toISOString() ??
        new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    })
  }, [])

  return (
    <div className='flex justify-center w-full'>
      <Calendar onChange={handleOnDateChange} />
    </div>
  )
}

export const CalendarDatePicker = memo(_CalendarDatePicker)
