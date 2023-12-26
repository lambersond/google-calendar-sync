import { createContext, useMemo, useState, useContext, memo } from 'react'
import { eachWeekOfInterval, max } from 'date-fns'
import { noop } from 'lodash'
import type { CalendarProviderProps, CurrentMonth, DayApi, DayData, RangeType } from './types'

const CalendarDataCtx = createContext<Date[]>([])
const CalendarMonthCtx = createContext<CurrentMonth>([new Date(), noop])
const CalendarDayApiCtx = createContext<DayApi>({
  setRange: noop,
  onChange: noop,
})
const CalendarDayDataCtx = createContext<DayData>({
  range: [null, null],
  potentialRange: [null, null],
})

function _CalendarProvider({
  children,
  onChange,
  startingDate = new Date(),
}: CalendarProviderProps) {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(startingDate.getFullYear(), startingDate.getMonth(), 1),
  )
  const [range, setRange] = useState<RangeType>({
    start: null,
    end: null,
    potentialEnd: null,
  })

  const monthValue = useMemo(() => {
    return [currentMonth, setCurrentMonth]
  }, [currentMonth]) satisfies CurrentMonth

  const weeks = useMemo(() => {
    const weeksOfMonth = eachWeekOfInterval({
      start: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1),
      end: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0),
    })

    return weeksOfMonth
  }, [currentMonth])

  const dayData = useMemo(() => {
    return {
      range: [range.start, range.end],
      potentialRange: [range.start, range.potentialEnd],
    } satisfies DayData
  }, [range])

  const dayApi = useMemo(() => {
    return {
      setRange,
      onChange,
    } satisfies DayApi
  }, [onChange])

  return (
    <CalendarMonthCtx.Provider value={monthValue}>
      <CalendarDataCtx.Provider value={weeks}>
        <CalendarDayApiCtx.Provider value={dayApi}>
          <CalendarDayDataCtx.Provider value={dayData}>{children}</CalendarDayDataCtx.Provider>
        </CalendarDayApiCtx.Provider>
      </CalendarDataCtx.Provider>
    </CalendarMonthCtx.Provider>
  )
}

export const CalendarProvider = memo(_CalendarProvider)
export const useCalendarData = () => useContext(CalendarDataCtx)
export const useCalendarMonth = () => useContext(CalendarMonthCtx)
export const useCalendarDayData = () => useContext(CalendarDayDataCtx)
export const useCalendarDayApi = () => {
  const { setRange, onChange } = useContext(CalendarDayApiCtx)

  return {
    onMouseEnter: (date: Date) => () => {
      setRange(prev => ({
        ...prev,
        potentialEnd:
          prev.start && !prev.end ? max([prev.start, date]) : prev.end ? prev.end : date,
      }))
    },
    onMouseLeave: () => {
      setRange(prev => ({
        ...prev,
        potentialEnd: prev.start,
      }))
    },
    onClick: (date: Date) => () => {
      setRange(prev => {
        const newRange =
          (prev.start && prev.end) || !prev.start
            ? { start: date, end: null, potentialEnd: date }
            : { ...prev, end: date }

        onChange([newRange.start, newRange.end])
        return newRange
      })
    },
  }
}
