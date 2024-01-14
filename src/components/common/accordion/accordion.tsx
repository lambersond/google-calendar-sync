import { memo } from 'react'
import { ArrowDownIcon } from '@/components/common/icons/arrow-down-icon'
import { AccordionProps } from './types'

function _Accordion({ title, children }: AccordionProps) {
  return (
    <details className='[&_svg]:open:rotate-180 mx-6' open>
      <summary className='flex cursor-pointer items-center justify-between'>
        {title}
        <ArrowDownIcon />
      </summary>
      {children}
    </details>
  )
}

export const Accordion = memo(_Accordion)
