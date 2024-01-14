import { type SVGAttributes } from 'react'

export function ArrowDownIcon(props: Readonly<SVGAttributes<SVGElement>>) {
  return (
    <svg
      className='rotate-0 transform text-secondary transition-all duration-300'
      fill='none'
      height='20'
      width='20'
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      viewBox='0 0 24 24'
      {...props}
      data-testid='ArrowDownIcon'
    >
      <polyline points='6 9 12 15 18 9'></polyline>
    </svg>
  )
}
