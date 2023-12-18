'use client'
import { memo } from 'react'
import { EventsProvider } from '@/hooks/use-events-sync'
import { CalendarListContainer } from './calendar-list-container'
import { CalendarSync } from './calendar-sync'

function _CalendarEvents() {
  return (
    <div className='w-full px-4 xl:px-24'>
      <EventsProvider>
        <CalendarListContainer />
        <CalendarSync />
      </EventsProvider>
    </div>
  )
}

export const CalendarEvents = memo(_CalendarEvents)
