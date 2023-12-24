import { memo, useMemo } from 'react'
import classNames from 'classnames'
import { isToday, isWithinInterval } from 'date-fns'
import { Button } from '@/components/common/button'
import { useCalendarDayApi, useCalendarDayData } from '../provider'

const staticClasses =
  'border-2 hover:bg-secondary text-white rounded-full h-10 w-10 focus:ring-2 focus:ring-red-700 transition-colors duration-200'

function _Day({ date }: { date: Date }) {
  const ranges = useCalendarDayData()
  const { onMouseEnter, onClick } = useCalendarDayApi()

  const dynamicClasses = useMemo(() => {
    const { range, potentialRange } = ranges

    const selected =
      range[0] && range[1] ? isWithinInterval(date, { start: range[0], end: range[1] }) : false
    const inRange =
      potentialRange[0] && potentialRange[1]
        ? isWithinInterval(date, { start: potentialRange[0], end: potentialRange[1] })
        : false
    const today = isToday(date)

    return classNames({
      'bg-tertiary font-bold border-transparent': selected,
      'bg-primary border-transparent': inRange,
      'border-transparent': !selected && !inRange && !today,
      'border-indigo-500': today,
    })
  }, [date, ranges])

  return (
    <Button
      className={`${dynamicClasses} ${staticClasses}`}
      onClick={onClick(date)}
      onMouseEnter={onMouseEnter(date)}
    >
      {date.getDate()}
    </Button>
  )
}

export const Day = memo(_Day)
