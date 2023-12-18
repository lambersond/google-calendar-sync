import { memo, useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { useEvents } from '@/hooks/use-events-sync'
import { setItem } from '@/utils/storage'
import { Button } from '../common/button'
import { GoogleIcon } from '../common/icons/google-icon'
import { transformEvents } from './helpers'

function _SaveAndLoginButton() {
  const events = useEvents()

  const login = useCallback(() => {
    const filteredEvents = transformEvents(Object.values(events).filter(event => event.checked))
    setItem('events', filteredEvents)
    signIn('google', { callbackUrl: window.location.origin + '/events/sync' })
  }, [events])

  return (
    <Button onClick={login}>
      <GoogleIcon />
      Select Your Second Account
    </Button>
  )
}

export const SaveAndLoginButton = memo(_SaveAndLoginButton)
