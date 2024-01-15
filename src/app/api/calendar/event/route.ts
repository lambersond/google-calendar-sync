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
  const res = await fetch(url.href, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  })

  const json = await res.json()

  const filteredEvents =
    json.items?.filter((e: Event) => !e.extendedProperties?.private?.synced) ?? []

  return new NextResponse<{ events: Event[] }>(
    JSON.stringify({
      events: filteredEvents,
    }),
  )
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const token = await getToken({ req })

  const searchExisting = new URL(calendarApi)
  searchExisting.searchParams.append(
    'privateExtendedProperty',
    `originalEventId=${body.extendedProperties?.private?.originalEventId}`,
  )
  const searchRes = await fetch(searchExisting, {
    headers: {
      Authorization: `Bearer ${token?.accessToken}`,
    },
  })
  const alreadyExists = await searchRes.json()

  if (alreadyExists.items?.length === 0) {
    return fetch(calendarApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token?.accessToken}`,
      },
      body: JSON.stringify({
        ...body,
        attendees: [{ email: token?.email, responseStatus: 'accepted' }],
      }),
    })
  } else {
    return new NextResponse(JSON.stringify(alreadyExists.items[0]))
  }
}
