import { BroadcastChannel } from 'broadcast-channel'
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

export const postEvents = async (prefix = 'Synced') => {
  const channel = new BroadcastChannel('event-sync-channel')
  const events: Event[] = getItem('events') ?? []
  let progress = 1

  const promises = events.map(async event => {
    const response = await fetch(window.origin + '/api/calendar/event', {
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

    channel.postMessage((progress++ / events.length) * 100)

    return response.json()
  })

  return await Promise.all(promises)
}
