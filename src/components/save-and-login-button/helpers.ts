import { SyncEvent } from '@/types'

export const transformEvents = (events: SyncEvent[]) =>
  events.map(event => ({
    summary: event.summary,
    location: event.location,
    description: '',
    start: event.start,
    end: event.end,
    originalStartTime: event.originalStartTime,
    recurrence: [],
    attendees: [],
    reminders: {},
    extendedProperties: {
      private: {
        originalEventId: event.id,
        synced: true,
      },
    },
  }))
