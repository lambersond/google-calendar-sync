import type { MouseEventHandler, ReactNode } from 'react'

export function Button({
  children,
  onClick,
}: {
  children: ReactNode
  onClick: MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
