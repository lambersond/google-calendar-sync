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
import { getEvents } from '@/utils/fetch/fetch-events'
import { getItem } from '@/utils/storage'
import type { Event, SyncEvent } from '@/types'

const calendarParams = getItem('calendarParams')

type EventsSync = Record<string, SyncEvent>

const defaultState = {} as EventsSync

const EventsDataCtx = createContext<EventsSync>(defaultState)
const EventsApiCtx = createContext<Dispatch<SetStateAction<EventsSync>>>(() => {})

export function EventsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [events, setEvents] = useState<Record<string, SyncEvent>>(defaultState)

  const value = useMemo(() => events, [events])

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

      const items = res.events.reduce((acc: Record<string, SyncEvent>, curr: Event) => {
        acc[curr.id] = { ...curr, checked: false }
        return acc
      }, {})

      setEvents(items)
    })()
  }, [])

  return (
    <EventsApiCtx.Provider value={setEvents}>
      <EventsDataCtx.Provider value={value}>{children}</EventsDataCtx.Provider>
    </EventsApiCtx.Provider>
  )
}

export const useEvents = () => useContext(EventsDataCtx)
export const useSetEvents = () => useContext(EventsApiCtx)
export const useUpdateSyncEventCheck = () => {
  const setEvents = useSetEvents()
  return (id: string, checked: boolean) => {
    setEvents(prevEvents => ({
      ...prevEvents,
      [id]: {
        ...prevEvents[id],
        checked,
      },
    }))
  }
}
