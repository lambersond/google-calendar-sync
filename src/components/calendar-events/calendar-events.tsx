'use client'
import { memo } from 'react'
import { CalendarParamsProvider } from '@/hooks/use-calendar-params'
import { EventsProvider } from '@/hooks/use-events-sync'
import { CalendarDatePicker } from './calendar-date-picker'
import { CalendarListContainer } from './calendar-list-container'
import { CalendarSync } from './calendar-sync'

function _CalendarEvents() {
  return (
    <div className='w-full px-4 xl:px-24'>
      <CalendarParamsProvider>
        <EventsProvider>
          <CalendarDatePicker />
          <CalendarListContainer />
          <CalendarSync />
        </EventsProvider>
      </CalendarParamsProvider>
    </div>
  )
}

export const CalendarEvents = memo(_CalendarEvents)
