'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { useBroadcastChannel } from '@/hooks/use-broadcast-channel'
import { postEvents } from '@/utils/fetch/fetch-events'

export default function Select() {
  const [prefix, setPrefix] = useState('')
  const status = useBroadcastChannel(0)

  const onClick = useCallback(() => {
    postEvents(prefix)
  }, [prefix])

  return (
    <>
      <Input label='Title Prefix:' onChange={setPrefix} />
      <Button onClick={onClick}>Sync Events</Button>
      <p>{status}</p>
    </>
  )
}
