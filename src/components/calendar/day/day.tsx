import { memo, useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { isToday, isWithinInterval } from 'date-fns'
import { Button } from '@/components/common/button'
import { useCalendarDayApi, useCalendarDayData } from '../provider'

const staticClasses =
  'border-2 border-transparent hover:bg-secondary text-white-100 rounded-full w-10 h-10 focus:ring-2 focus:ring-red-700 transition-colors duration-200'

function _Day({ date }: { date: Date }) {
  const { range, potentialRange } = useCalendarDayData()
  const { onMouseEnter, onClick } = useCalendarDayApi()

  const handleOnClick = useCallback(() => {
    onClick(date)
  }, [date])

  const handleOnMouseEnter = useCallback(() => {
    onMouseEnter(date)
  }, [date])

  const dynamicClasses = useMemo(() => {
    const selected =
      range[0] && range[1] ? isWithinInterval(date, { start: range[0], end: range[1] }) : false
    const inRange =
      potentialRange[0] && potentialRange[1]
        ? isWithinInterval(date, { start: potentialRange[0], end: potentialRange[1] })
        : false
    return classNames({
      'bg-tertiary text-white': selected,
      'bg-primary text-white': inRange,
      'border-indigo-500': isToday(date),
      'text-white': !selected && !inRange,
    })
  }, [range])

  return (
    <Button
      className={`${dynamicClasses} ${staticClasses}`}
      onClick={handleOnClick}
      onMouseEnter={handleOnMouseEnter}
    >
      {date.getDate()}
    </Button>
  )
}

export const Day = memo(_Day)
