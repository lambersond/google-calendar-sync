import { memo, type ReactNode } from 'react'

const staticClasses = 'flex justify-between grow items-center gap-2 mt-2'
function _Row({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${staticClasses} ${className}`}>{children}</div>
}

export const Row = memo(_Row)
