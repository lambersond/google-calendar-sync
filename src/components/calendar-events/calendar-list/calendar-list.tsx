import { memo } from 'react'
import { useEvents } from '@/hooks/use-events-sync'
import { CalendarEventItem } from '../calendar-event-item'
import type { SyncEvent } from '@/types'

function _CalendarList() {
  const events = useEvents()

  return Object.values(events).map((event: SyncEvent) => (
    <CalendarEventItem key={event.id} event={event} />
  ))
}

export const CalendarList = memo(_CalendarList)
