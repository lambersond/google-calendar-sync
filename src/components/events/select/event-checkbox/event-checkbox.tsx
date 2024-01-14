import { memo } from 'react'
import { Checkbox } from '@/components/common/checkbox'
import { Duration } from '../duration'
import type { EventCheckboxProps } from './types'

function _EventCheckbox({ onChange, event }: EventCheckboxProps) {
  const { id, checked, start, end } = event

  return (
    <label className='flex items-center grow cursor-pointer text-gray-200 cursor-pointer'>
      <Checkbox id={id} checked={checked} onChange={onChange} />
      <Duration start={start} end={end} />
      <p className='text-lg'>{event.summary}</p>
    </label>
  )
}

export const EventCheckbox = memo(_EventCheckbox)
