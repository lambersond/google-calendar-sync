import { memo, useEffect } from 'react'
import { useSetEvents } from '@/hooks/use-events-sync'
import { getEvents } from '@/utils/fetch/fetch-events'
import { getItem } from '@/utils/storage'
import { CalendarList } from '../calendar-list'
import type { Event, SyncEvent } from '@/types'

function _CalendarListContainer() {
  const calendarParams = getItem('calendarParams')
  const setEvents = useSetEvents()

  useEffect(() => {
    ;(async () => {
      const res = await getEvents({
        singleEvents: true,
        orderBy: 'startTime',
        maxResults: 50,
        showDeleted: false,
        timeMin: calendarParams.timeMin,
        timeMax: calendarParams.timeMax,
      })

      const items = res.events.reduce((acc: Record<string, SyncEvent>, curr: Event) => {
        acc[curr.id] = { ...curr, checked: false }
        return acc
      }, {})

      setEvents(items)
    })()
  }, [calendarParams])

  return (
    <div className='w-full px-4 2xl:px-24 mt-2'>
      <div className='text-gray-200 flex mb-2 align-center'>
        <div className='flex align-center basis-[24px]' />
        <p className='basis-[35%] grow'>Summary</p>
        <p className='basis-[230px] grow'>Start</p>
        <p className='basis-[230px]'>End</p>
      </div>
      <CalendarList />
    </div>
  )
}

export const CalendarListContainer = memo(_CalendarListContainer)
