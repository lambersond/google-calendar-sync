import { memo, useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { useEvents } from '@/hooks/use-events-sync'
import { setItem } from '@/utils/storage'
import { GoogleButton } from '../google-button'
import { transformEvents } from './helpers'

function _SaveAndLoginButton() {
  const events = useEvents()

  const login = useCallback(() => {
    const filteredEvents = transformEvents(Object.values(events).filter(event => event.checked))
    setItem('events', filteredEvents)
    signIn('google', { callbackUrl: window.location.origin + '/events/sync' })
  }, [events])

  return <GoogleButton onClick={login} />
}

export const SaveAndLoginButton = memo(_SaveAndLoginButton)
