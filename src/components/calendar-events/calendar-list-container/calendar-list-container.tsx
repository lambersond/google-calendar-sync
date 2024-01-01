import { CalendarList } from '../calendar-list'

export function CalendarListContainer() {
  return (
    <div className='w-full px-4 mt-2'>
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
