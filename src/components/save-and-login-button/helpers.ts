import { SyncEvent } from '@/types'

export const transformEvents = (events: SyncEvent[]) =>
  events.map(event => ({
    summary: event.summary,
    location: event.location,
    description: '',
    start: event.start,
    end: event.end,
    recurrence: [],
    attendees: [],
    reminders: {},
  }))
