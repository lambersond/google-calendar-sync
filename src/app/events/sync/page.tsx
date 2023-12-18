'use client'
import { useCallback, useState } from 'react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { postEvents } from '@/utils/fetch/fetch-events'
import { getItem } from '@/utils/storage'
import type { Event } from '@/types'

export default function Select() {
  const [prefix, setPrefix] = useState('')

  const onClick = useCallback(() => {
    const events = getItem('events') as Event[]
    postEvents(
      events.map(event => ({
        ...event,
        summary: `${prefix ? prefix + ': ' : 'Synced: '} ${event.summary}`,
      })),
    )
  }, [prefix])

  return (
    <>
      <Input label='Title Prefix:' onChange={setPrefix} />
      <Button onClick={onClick}>Sync Events</Button>
    </>
  )
}
