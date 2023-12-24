import { memo } from 'react'
import { Row } from '../row'

const classNames = 'w-10 text-center'

function _Weekdays() {
  return (
    <Row>
      <span className={classNames}>Sun</span>
      <span className={classNames}>Mon</span>
      <span className={classNames}>Tue</span>
      <span className={classNames}>Wed</span>
      <span className={classNames}>Thu</span>
      <span className={classNames}>Fri</span>
      <span className={classNames}>Sat</span>
    </Row>
  )
}

export const Weekdays = memo(_Weekdays)
