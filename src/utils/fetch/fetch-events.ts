import { Event } from '@/types'

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

export const postEvents = async (events: Event[]) => {
  const res = await fetch(window.origin + '/api/calendar/event', {
    credentials: 'include',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ events }),
  })

  // return (await res.json()) as Promise<{ events: Event[] }>
  return res
}
