import { signIn } from 'next-auth/react'
import { Event, SyncEvent } from '@/types'

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

export const postEvents = async (events: Record<string, SyncEvent>, preface: string) => {
  const res = await fetch(window.origin + '/api/calendar/event', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ events: Object.values(events).filter(e => e.checked), preface }),
  })

  // return (await res.json()) as Promise<{ events: Event[] }>
  return res
}
