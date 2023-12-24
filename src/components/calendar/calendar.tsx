import { memo } from 'react'
import { Header } from './header'
import { CalendarProvider, useCalendarDayApi } from './provider'
import { Weekdays } from './weekdays'
import { Weeks } from './weeks'

const today = new Date()

function _Calendar({
  startingDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
  onChange,
}: {
  startingDate?: Date
  onChange: (range: [Date, Date | null]) => void
}) {
  return (
    <CalendarProvider startingDate={startingDate} onChange={onChange}>
      <WrappedCalendar />
    </CalendarProvider>
  )
}

const WrappedCalendar = () => {
  const { onMouseLeave } = useCalendarDayApi()
  return (
    <div
      className='w-full bg-zinc-900 min-w-sm min-h-sm flex-col max-w-[524px] max-h-md sm:rounded-lg p-4 overflow-hidden text-slate-400 shadow-[0_0_32px_0px_black]'
      onMouseLeave={onMouseLeave}
    >
      <Header />
      <Weekdays />
      <div className='border-b-2 border-slate-700 w-[120%] ml-[-12px] mb-2' />
      <Weeks />
    </div>
  )
}

export const Calendar = memo(_Calendar)
