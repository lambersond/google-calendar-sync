import { memo } from 'react'

const _ProgressBar = ({
  progress = 0,
  className = 'w-full rounded-full h-1.5 mb-4 bg-tertiary',
}: {
  progress?: number | null
  className?: string
}) => {
  return (
    <div className={className} data-testid='progress-bar__outer'>
      <div
        className='bg-secondary h-1.5 rounded-full'
        style={{ width: `${progress}%` }}
        data-testid='progress-bar__inner'
      />
    </div>
  )
}

export const ProgressBar = memo(_ProgressBar)
