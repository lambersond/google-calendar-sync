import { Event } from '@/types'
import { getItem } from '../storage'

export const getEvents = async (searchParams: Record<string, string | boolean | number>) => {
  const url = new URL(window.origin + '/api/calendar/event')

  Object.entries(searchParams).forEach(([key, value]) => {
    url.searchParams.set(key, value.toString())
  })

  const res = await fetch(url.href, {
    credentials: 'include',
  })
  return (await res.json()) as Promise<{ events: Event[] }>
}

export const postEvents = (prefix = 'Synced') => {
  const channel = new BroadcastChannel('event-sync-channel')
  const events: Event[] = getItem('events') ?? []

  events.forEach(async (event, idx) => {
    await fetch(window.origin + '/api/calendar/event', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        summary: `${prefix}: ${event.summary}`,
      }),
    })

    channel.postMessage(idx + 1 / events.length)
  })
}
