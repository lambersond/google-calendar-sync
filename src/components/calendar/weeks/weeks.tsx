import { memo } from 'react'
import { useCalendarData } from '../provider'
import { Week } from '../week'

function _Weeks() {
  const weeksOfMonth = useCalendarData()

  return weeksOfMonth.map(week => <Week key={week.toISOString()} startingDate={week} />)
}

export const Weeks = memo(_Weeks)
