import assert from 'assert'
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
} from 'react'
import { endOfToday, isSameDay, startOfToday } from 'date-fns'
import { findIndex, flatMap, noop } from 'lodash'
import { CALENDAR_PARAMS } from '@/constants'
import { formatToDate, parseEventDateFieldToDateTime } from '@/utils/date-helpers'
import { getEvents } from '@/utils/fetch/fetch-events'
import { getItem } from '@/utils/storage'
import { useShiftPressed } from './use-shift-pressed'
import type { Event, SyncEvent } from '@/types'

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
      const calendarParams = getItem(CALENDAR_PARAMS)
      const timeMin = calendarParams?.timeMin ?? startOfToday().toISOString()
      const timeMax = calendarParams?.timeMax ?? endOfToday().toISOString()

      const res = await getEvents({
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 50,
        showDeleted: false,
        timeMin,
        timeMax,
      })

      const items = res.events.flatMap((event: Event) =>
        event.start ? [{ ...event, checked: false }] : [],
      )

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

const inRange = (min: number, max: number, value: number) => value >= min && value <= max
const isEquals = (a: number, b: number) => a === b
const modifyEvent = (equality: boolean, checked: boolean, event: SyncEvent) =>
  equality ? { ...event, checked } : event

export const useShiftSelection = () => {
  const setEvents = useSetEvents()
  const isShift = useShiftPressed()
  const [[previousIndex, lastShiftIndex], setPreviousIndex] = useContext(PreviousCtx)

  return (id: string, checked: boolean, isGroup = false) => {
    if (isGroup) {
      const datetime = new Date(id)

      if (isShift) {
        setEvents(prevEvents => {
          const groupedEventsIndexes = flatMap(prevEvents, ({ start }, idx) => {
            const eventDate = parseEventDateFieldToDateTime(start)
            return isSameDay(datetime, eventDate) ? [idx] : []
          })
          const index = Math.max(...groupedEventsIndexes)
          const increment = +(lastShiftIndex !== previousIndex)
          const min = Math.min(previousIndex + increment, index)
          const max = Math.max(previousIndex - increment, index)

          setPreviousIndex([index, index])

          return prevEvents.map((event, i) => modifyEvent(inRange(min, max, i), checked, event))
        })
      } else {
        setEvents(prevEvents =>
          prevEvents.map(event => {
            const eventDate = parseEventDateFieldToDateTime(event.start)
            return modifyEvent(isSameDay(datetime, eventDate), checked, event)
          }),
        )
      }
    } else {
      setEvents(prevEvents => {
        const index = findIndex(prevEvents, ['id', id])

        if (isShift) {
          const increment = +(lastShiftIndex !== previousIndex)
          const min = Math.min(previousIndex + increment, index)
          const max = Math.max(previousIndex - increment, index)

          setPreviousIndex([index, index])

          return prevEvents.map((event, i) => modifyEvent(inRange(min, max, i), checked, event))
        } else {
          setPreviousIndex([index, -1])

          return prevEvents.map((event, i) => modifyEvent(isEquals(i, index), checked, event))
        }
      })
    }
  }
}

export const useGroupedEvents = () => {
  const events = useEvents()

  return events.reduce(
    (groups, event) => {
      assert(event.start, 'Event start is undefined')

      const {
        start: { dateTime },
      } = event

      const dateKey = dateTime
        ? new Date(dateTime).toLocaleDateString()
        : formatToDate(event.start.date as string).toLocaleDateString()

      groups[dateKey] ??= []
      groups[dateKey].push(event)

      return groups
    },
    {} as Record<string, SyncEvent[]>,
  )
}
