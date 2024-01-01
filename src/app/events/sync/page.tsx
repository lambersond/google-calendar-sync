'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { EventsLayout } from '@/components/layouts'
import { useBroadcastChannel } from '@/hooks/use-broadcast-channel'
import { postEvents } from '@/utils/fetch/fetch-events'

export default function Select() {
  const [prefix, setPrefix] = useState('')
  const status = useBroadcastChannel(0)

  const onClick = useCallback(
    (prefix: string) => () => {
      postEvents(prefix)
    },
    [],
  )

  return (
    <EventsLayout>
      <Input label='Title Prefix:' onChange={setPrefix} />
      <Button
        onClick={onClick(prefix)}
        className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      >
        Sync Events
      </Button>
      <p>{status}</p>
    </EventsLayout>
  )
}
