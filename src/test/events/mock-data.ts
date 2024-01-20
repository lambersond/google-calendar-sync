export const mockEvents = [
  {
    id: '0',
    summary: 'multi-day',
    start: {
      date: '2024-01-08',
    },
    end: {
      date: '2024-01-10',
    },
  },
  {
    id: '1',
    summary: 'all-day',
    start: {
      dateTime: '2024-01-15T00:00:00-05:00',
    },
    end: {
      dateTime: '2024-01-16T00:00:00-05:00',
    },
  },
  {
    id: '2',
    summary: 'one-hour',
    start: {
      dateTime: '2024-01-15T11:00:00-05:00',
    },
    end: {
      dateTime: '2024-01-15T12:00:00-05:00',
    },
  },
  {
    id: '3',
    summary: 'twenty-six-hour',
    start: {
      dateTime: '2024-01-15T13:00:00-05:00',
    },
    end: {
      dateTime: '2024-01-16T15:00:00-05:00',
    },
  },
  {
    id: 'bad-event',
    summary: 'missing-start',
    end: {
      dateTime: '2024-01-16T15:00:00-05:00',
    },
  },
]
