import { type MouseEvent, memo } from 'react'
import { CheckboxCheckedIcon } from '@/components/common/icons/checkbox-checked-icon'
import { CheckboxOutlineIcon } from '@/components/common/icons/checkbox-outline-icon'
import { useUpdateSyncEventCheck } from '@/hooks/use-events-sync'
import type { CalendarEventItemProps } from './types'

function _CalendarEventItem(props: CalendarEventItemProps) {
  const { event, index } = props
  const updateSyncEvent = useUpdateSyncEventCheck()

  const onClick = (e: MouseEvent<HTMLElement>) => {
    updateSyncEvent(event.id, index, e.shiftKey, !event.checked)
  }

  return (
    <div
      key={event.id}
      className='text-gray-200 flex leading-8 align-center divide-y divide-slate-700 hover:bg-slate-700 hover:bg-opacity-50 transition-colors cursor-pointer'
      onClick={onClick}
    >
      <div className='flex items-center basis-[24px]'>
        {event.checked ? (
          <CheckboxCheckedIcon className='fill-secondary' width={20} />
        ) : (
          <CheckboxOutlineIcon className='fill-neutral-100' width={20} />
        )}
      </div>
      <p className='basis-[35%] grow'>{event.summary}</p>
      <p className='basis-[230px] grow'>{event?.start?.dateTime}</p>
      <p className='basis-[230px]'>{event?.end?.dateTime}</p>
    </div>
  )
}

export const CalendarEventItem = memo(_CalendarEventItem)
