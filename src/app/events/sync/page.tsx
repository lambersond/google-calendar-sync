'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { ProgressBar } from '@/components/common/progress-bar'
import { useBroadcastChannel } from '@/hooks/use-broadcast-channel'
import { postEvents } from '@/utils/fetch/fetch-events'

export default function Select() {
  const [prefix, setPrefix] = useState('')
  const [showProgress, setShowProgress] = useState(false)
  const status = useBroadcastChannel(0)

  const onClick = useCallback(
    (prefix: string) => () => {
      setShowProgress(true)
      postEvents(prefix)
    },
    [],
  )

  return (
    <>
      {showProgress && (
        <ProgressBar
          progress={status}
          className='w-full rounded-full h-1.5 mb-4 bg-tertiary fixed top-[62px]'
        />
      )}
      <Input label='Title Prefix:' onChange={setPrefix} />
      <Button
        onClick={onClick(prefix)}
        className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      >
        Sync Events
      </Button>
    </>
  )
}
