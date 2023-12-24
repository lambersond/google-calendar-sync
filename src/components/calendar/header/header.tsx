import { memo } from 'react'
import { format } from 'date-fns'
import { Button } from '@/components/common/button'
import { ArrowLeftIcon } from '@/components/common/icons/arrow-left-icon'
import { ArrowRightIcon } from '@/components/common/icons/arrow-right-icon'
import { useCalendarMonth } from '../provider'
import { Row } from '../row'

const iconButtonClasses = 'flex p-2 rounded-full w-10 h-10 hover:bg-gray-100/10'

function _Header() {
  const [currentMonth, setCurrentMonth] = useCalendarMonth()

  const handleMonthChange = (month: number) => () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + month, 1))

  return (
    <Row className='mb-4'>
      <Button className={iconButtonClasses} onClick={handleMonthChange(-1)}>
        <ArrowLeftIcon fill='white' style={{ marginLeft: -1 }} />
      </Button>
      <div className='p-2 font-bold text-2xl text-white'>
        {format(currentMonth, 'MMMM')} {currentMonth.getFullYear()}
      </div>
      <Button className={iconButtonClasses} onClick={handleMonthChange(1)}>
        <ArrowRightIcon fill='white' style={{ marginLeft: 1 }} />
      </Button>
    </Row>
  )
}

export const Header = memo(_Header)
