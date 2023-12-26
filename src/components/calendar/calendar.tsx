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
  onChange: (range: [Date | null, Date | null]) => void
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
      className='flex flex-col gap-2 bg-zinc-900 w-full h-[430px] max-w-[524px] sm:rounded-lg p-4 overflow-hidden text-slate-400 shadow-[0_0_32px_0px_black]'
      onMouseLeave={onMouseLeave}
    >
      <div className='h-24'>
        <Header />
        <Weekdays />
        <div className='border-b-2 border-slate-700 w-[108%] ml-[-20px] mb-1' />
      </div>
      <Weeks />
    </div>
  )
}

export const Calendar = memo(_Calendar)
