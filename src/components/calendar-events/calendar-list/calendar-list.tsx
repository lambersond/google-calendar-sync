import { memo } from 'react'
import { useEvents } from '@/hooks/use-events-sync'
import { CalendarEventItem } from '../calendar-event-item'
import type { SyncEvent } from '@/types'

function _CalendarList() {
  const events = useEvents()

  return events.map((event: SyncEvent, index: number) => (
    <CalendarEventItem key={event.id} event={event} index={index} />
  ))
}

export const CalendarList = memo(_CalendarList)
