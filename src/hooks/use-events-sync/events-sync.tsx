import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'
import { endOfToday, startOfToday } from 'date-fns'
import { noop } from 'lodash'
import { getEvents } from '@/utils/fetch/fetch-events'
import { getItem } from '@/utils/storage'
import type { Event, SyncEvent } from '@/types'

const calendarParams = getItem('calendarParams')

const EventsDataCtx = createContext<SyncEvent[]>([])
const EventsApiCtx = createContext<Dispatch<SetStateAction<SyncEvent[]>>>(noop)
const PreviousCtx = createContext<[[number, number], Dispatch<SetStateAction<[number, number]>>]>([
  [-1, -1],
  noop,
])

export function EventsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [events, setEvents] = useState<SyncEvent[]>([])
  const previous = useState<[number, number]>([-1, -1])

  const value = useMemo(() => events, [events])
  const previousValue = useMemo(() => previous, [previous])

  useEffect(() => {
    ;(async () => {
      const res = await getEvents({
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 50,
        showDeleted: false,
        timeMin: calendarParams?.timeMin ?? startOfToday().toISOString(),
        timeMax: calendarParams?.timeMax ?? endOfToday().toISOString(),
      })

      const items = res.events.map((event: Event) => ({ ...event, checked: false }))

      setEvents(items)
    })()
  }, [])

  return (
    <EventsApiCtx.Provider value={setEvents}>
      <PreviousCtx.Provider value={previousValue}>
        <EventsDataCtx.Provider value={value}>{children}</EventsDataCtx.Provider>
      </PreviousCtx.Provider>
    </EventsApiCtx.Provider>
  )
}

export const useEvents = () => useContext(EventsDataCtx)
export const useSetEvents = () => useContext(EventsApiCtx)
export const useUpdateSyncEventCheck = () => {
  const setEvents = useSetEvents()
  const [[previousIndex, lastShiftIndex], setPreviousIndex] = useContext(PreviousCtx)

  return (id: string, index: number, isShiftPressed: boolean, checked: boolean) => {
    if (isShiftPressed) {
      setEvents(prevEvents => {
        const increment = lastShiftIndex === previousIndex ? 0 : 1
        const min = Math.min(previousIndex + increment, index)
        const max = Math.max(previousIndex - increment, index)

        return prevEvents.map((event, i) => (i >= min && i <= max ? { ...event, checked } : event))
      })
      setPreviousIndex([index, index])
    } else {
      setEvents(prevEvents =>
        prevEvents.map(event => (event.id === id ? { ...event, checked } : event)),
      )
      setPreviousIndex([index, -1])
    }
  }
}
