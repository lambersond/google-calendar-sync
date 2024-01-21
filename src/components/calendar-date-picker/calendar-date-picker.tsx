import { memo } from 'react'
import { Calendar } from '@/components/calendar/calendar'
import { setDateRange } from './helpers'

export function _CalendarDatePicker() {
  return (
    <div className='flex justify-center w-full'>
      <Calendar onChange={setDateRange} />
    </div>
  )
}

export const CalendarDatePicker = memo(_CalendarDatePicker)
