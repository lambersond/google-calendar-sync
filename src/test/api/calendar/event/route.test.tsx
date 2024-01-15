/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/calendar/event/route'
import { mockData } from './mock-data'

jest.mock('next-auth/jwt', () => ({
  getToken: () => Promise.resolve({ accessToken: 'mock-token' }),
}))

describe('api/calendar/event/route', () => {
  const mockFetch = jest.fn()
  const unmockedFetch = global.fetch
  const nextRequest = {
    nextUrl: {
      searchParams: new URLSearchParams('start=2021-01-01&end=2021-01-02'),
    },
    json: () => Promise.resolve({}),
  } as NextRequest

  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetch()),
      } as Response)
  })

  afterAll(() => {
    global.fetch = unmockedFetch
  })

  it('GET: should fetch events', async () => {
    mockFetch.mockResolvedValueOnce({ items: mockData })

    const response = await GET(nextRequest)
    const body = await response.json()

    expect(body).toEqual({ events: mockData })
  })

  it('GET: should filter out synced events', async () => {
    const syncedEvent = { ...mockData[0], extendedProperties: { private: { synced: true } } }
    mockFetch.mockResolvedValueOnce({ items: [syncedEvent] })

    const response = await GET(nextRequest)
    const body = await response.json()

    expect(body).toEqual({ events: [] })
  })

  it('POST: should create event', async () => {
    mockFetch.mockResolvedValueOnce({ items: [] }).mockResolvedValueOnce({ items: mockData })

    const response = await POST(nextRequest)
    const body = await response.json()

    expect(body).toEqual({ items: mockData })
  })

  it('POST: should skip if event already exists', async () => {
    mockFetch.mockResolvedValueOnce({ items: mockData })

    const req = { ...nextRequest, json: () => Promise.resolve({ id: 'id-0' }) } as NextRequest

    const response = await POST(req)
    const body = await response.json()

    expect(body).toEqual({ ...mockData[0] })
  })
})
