import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react'
import type { SyncEvent } from '@/types'

type EventsSync = Record<string, SyncEvent>

const defaultState = {} as EventsSync

const EventsDataCtx = createContext<EventsSync>(defaultState)
const EventsApiCtx = createContext<Dispatch<SetStateAction<EventsSync>>>(() => {})

export function EventsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [events, setEvents] = useState<Record<string, SyncEvent>>(defaultState)

  const value = useMemo(() => events, [events])

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
