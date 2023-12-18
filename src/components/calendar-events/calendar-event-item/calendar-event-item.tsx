import { ChangeEvent, memo } from 'react'
import { useUpdateSyncEventCheck } from '@/hooks/use-events-sync'
import type { CalendarEventItemProps } from './types'

function _CalendarEventItem(props: CalendarEventItemProps) {
  const { event } = props
  const updateSyncEvent = useUpdateSyncEventCheck()

  const onChange = ({ target: { checked } }: ChangeEvent<HTMLInputElement>) =>
    updateSyncEvent(event.id, checked)

  return (
    <div
      key={event.id}
      className='text-gray-200 flex leading-8 align-center divide-y divide-slate-700 hover:bg-slate-700 hover:bg-opacity-50 transition-colors cursor-pointer'
      onClick={() => onChange({ target: { checked: !event.checked } } as any)}
    >
      <div className='flex items-center basis-[24px]'>
        <input
          className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer'
          type='checkbox'
          checked={event.checked}
          onChange={onChange}
        />
      </div>
      <p className='basis-[35%] grow'>{event.summary}</p>
      <p className='basis-[230px] grow'>{event?.start?.dateTime}</p>
      <p className='basis-[230px]'>{event?.end?.dateTime}</p>
    </div>
  )
}

export const CalendarEventItem = memo(_CalendarEventItem)
