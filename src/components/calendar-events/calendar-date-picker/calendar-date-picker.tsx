import { memo, useCallback } from 'react'
import { DateRangePicker } from '@/components/date-range-picker'
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
    <div className='flex justify-center'>
      <DateRangePicker onChange={handleOnDateChange} />
    </div>
  )
}

export const CalendarDatePicker = memo(_CalendarDatePicker)
