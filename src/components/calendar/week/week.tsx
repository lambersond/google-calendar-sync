import { memo } from 'react'
import { addDays } from 'date-fns'
import { Day } from '../day'
import { Row } from '../row'

function _Week({ startingDate }: { startingDate: Date }) {
  const days = [
    startingDate,
    addDays(startingDate, 1),
    addDays(startingDate, 2),
    addDays(startingDate, 3),
    addDays(startingDate, 4),
    addDays(startingDate, 5),
    addDays(startingDate, 6),
  ]
  return (
    <Row>
      {days.map(day => (
        <Day key={day.toISOString()} date={day} />
      ))}
    </Row>
  )
}

export const Week = memo(_Week)
