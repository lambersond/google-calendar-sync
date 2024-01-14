import { memo } from 'react'
import { Accordion } from '@/components/common/accordion'
import { DayCheckbox } from '@/components/events/select/day-checkbox'
import { EventCheckbox } from '@/components/events/select/event-checkbox'
import { useShiftSelection, useGroupedEvents } from '@/hooks/use-events-sync'
import type { SyncEvent } from '@/types'

function _CalendarList() {
  const groupedEvents = useGroupedEvents()
  const shiftSelection = useShiftSelection()

  const onDayChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    shiftSelection(target.id, target.checked, true)
  }

  const onEventChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    shiftSelection(target.id, target.checked)
  }

  return Object.entries(groupedEvents).map(([date, events]) => {
    const checked = events.every((event: SyncEvent) => event.checked)
    const indeterminate = events.some((event: SyncEvent) => event.checked) && !checked

    return (
      <div
        key={date}
        className='text-gray-200 border-b border-slate-700 w-full hover:bg-slate-700 hover:bg-opacity-50 transition-colors py-2'
      >
        <Accordion
          title={
            <DayCheckbox
              key={date}
              dayString={date}
              indeterminate={indeterminate}
              checked={checked}
              onChange={onDayChange}
            />
          }
        >
          <div className='pl-4'>
            {events.map((event: SyncEvent) => (
              <div
                key={event.id}
                className='flex items-center hover:bg-slate-700 hover:bg-opacity-50 transition-colors pl-4'
              >
                <EventCheckbox event={event} onChange={onEventChange} />
              </div>
            ))}
          </div>
        </Accordion>
      </div>
    )
  })
}

export const CalendarList = memo(_CalendarList)
