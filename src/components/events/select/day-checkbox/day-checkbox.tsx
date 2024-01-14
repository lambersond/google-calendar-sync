import { memo } from 'react'
import { format } from 'date-fns'
import { Checkbox } from '@/components/common/checkbox'
import type { DayCheckboxProps } from './types'

function _DayCheckbox({ dayString, indeterminate, checked, onChange }: DayCheckboxProps) {
  return (
    <label className='flex items-center grow cursor-pointer'>
      <Checkbox
        id={dayString}
        indeterminate={indeterminate}
        checked={checked}
        onChange={onChange}
      />
      <p className='text-xl font-bold text-gray-200'>
        {format(new Date(dayString), 'LLL do, yyyy')}
      </p>
    </label>
  )
}

export const DayCheckbox = memo(_DayCheckbox)
