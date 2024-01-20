import { useEffect, useState } from 'react'
import { BroadcastChannel } from 'broadcast-channel'

export function useBroadcastChannel<T = string>(defaultValue: T | null = null): T | null {
  const [message, setMessage] = useState<T | null>(defaultValue)

  useEffect(() => {
    const fn = (event: T) => {
      setMessage(prev => event || prev)
    }
    new BroadcastChannel('event-sync-channel').addEventListener('message', fn)

    return () => {
      new BroadcastChannel('event-sync-channel').removeEventListener('message', fn)
    }
  }, [])

  return message
}
