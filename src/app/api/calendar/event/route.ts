import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { Event } from '@/types'

const calendarApi = 'https://content.googleapis.com/calendar/v3/calendars/primary/events'

export async function GET(req: NextRequest) {
  const url = new URL(calendarApi)

  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value)
  })

  const token = await getToken({ req })

  const googleRequest = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  })

  const googleResponse = await googleRequest.json()

  return new NextResponse<{ events: Event[] }>(
    JSON.stringify({
      events: googleResponse.items ?? [],
    }),
  )
}

export async function POST(req: NextRequest) {
  const url = new URL(calendarApi)

  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.set(key, value)
  })

  const body = await req.json()
  const token = await getToken({ req })

  body.events.forEach((event: Event) => {
    const syncedEvent = {
      ...event,
      attendees: [{ email: token?.email }],
    }

    fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify(syncedEvent),
    })
  })

  return new NextResponse()
}
