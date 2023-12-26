import { type SVGAttributes } from 'react'

export function ArrowLeftIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' {...props} data-testid='ArrowLeftIcon'>
      <path d='M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z' />
    </svg>
  )
}
