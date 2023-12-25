import { memo, useCallback } from 'react'
import { values } from 'lodash'
import { signIn } from 'next-auth/react'
import { useEvents } from '@/hooks/use-events-sync'
import { setItem } from '@/utils/storage'
import { GoogleButton } from '../google-button'
import { transformEvents } from './helpers'

function _SaveAndLoginButton() {
  const events = useEvents()
  const filteredEvents = transformEvents(values(events).filter(event => event.checked))

  const login = useCallback(() => {
    setItem('events', filteredEvents)
    signIn('google', { callbackUrl: window.location.origin + '/events/sync' })
  }, [filteredEvents])

  if (filteredEvents.length < 1) return null

  return <GoogleButton onClick={login} />
}

export const SaveAndLoginButton = memo(_SaveAndLoginButton)
