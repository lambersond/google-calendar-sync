import { memo } from 'react'
import { format, intervalToDuration } from 'date-fns'
import { isMidnightToMidnight, parseEventDateFieldToDateTime } from '@/utils/date-helpers'
import { Superscript } from '../superscript'
import type { SyncEvent } from '@/types'

const _Duration = ({ start: startDate, end: endDate }: Pick<SyncEvent, 'start' | 'end'>) => {
  const start = parseEventDateFieldToDateTime(startDate)
  const end = parseEventDateFieldToDateTime(endDate)

  const isAllDayEvent = isMidnightToMidnight(start, end)
  const isAllDay = !startDate?.dateTime && !endDate?.dateTime

  const duration = intervalToDuration({ start, end })
  const timeString =
    isAllDayEvent || isAllDay
      ? 'All Day'
      : `${format(start, 'h:mmaaa')} - ${format(end, 'h:mmaaa')}`

  return (
    <p className='basis-44'>
      {timeString}
      <Superscript days={duration.days} midnightToMidnight={isAllDayEvent} />
    </p>
  )
}

export const Duration = memo(_Duration)
