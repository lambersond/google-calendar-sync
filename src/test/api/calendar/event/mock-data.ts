import type { Event } from '@/types'

export const mockData: Event[] = [
  {
    kind: 'calendar#event',
    etag: '"0000"',
    id: 'id-1',
    status: 'confirmed',
    htmlLink: '',
    created: '2022-11-21T17:59:16.000Z',
    updated: '2024-01-09T21:44:29.340Z',
    summary: 'Summary 1',
    description: '',
    location: 'Earth',
    creator: {
      email: 'me@gmail.com',
      self: true,
    },
    organizer: {
      email: 'maybe-me@gmail.com',
      displayName: 'Bossy mc Boss Pants',
    },
    start: {
      dateTime: '2024-01-01T13:00:00-05:00',
      timeZone: 'America/Denver',
    },
    end: {
      dateTime: '2024-01-01T13:30:00-05:00',
      timeZone: 'America/Denver',
    },
    recurringEventId: null,
    originalStartTime: {
      dateTime: '2024-01-01T13:00:00-05:00',
      timeZone: 'America/Denver',
    },
    iCalUID: 'foo@google.com',
    sequence: 0,
    attendees: [],
    guestsCanInviteOthers: false,
    privateCopy: true,
    reminders: {
      useDefault: true,
    },
    eventType: 'default',
  },
]
