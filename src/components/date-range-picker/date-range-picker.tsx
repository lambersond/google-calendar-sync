import { memo, useState } from 'react'
import DatePicker from 'react-datepicker'

function _DateRangePicker({
  onChange = () => {},
}: Readonly<{ onChange?: (dates: [Date | null, Date | null]) => void }>) {
  const [dates, setDates] = useState<[Date | null, Date | null]>([new Date(), null])

  const handleChange = (dates: [Date | null, Date | null]) => {
    setDates(dates)
    onChange(dates)
  }

  return (
    <DatePicker
      selected={dates[0]}
      onChange={handleChange}
      startDate={dates[0]}
      endDate={dates[1]}
      selectsRange
      inline
      fixedHeight
    />
  )
}

export const DateRangePicker = memo(_DateRangePicker)
