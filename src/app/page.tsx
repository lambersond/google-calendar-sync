'use client'
import { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { CalendarDatePicker } from '@/components/calendar-events/calendar-date-picker'
import { GoogleButton } from '@/components/google-button'
import { EventsLayout } from '@/components/layouts'

export default function Home() {
  const login = useCallback(() => {
    signIn('google', { callbackUrl: window.location.origin + '/events/select' })
  }, [])

  return (
    <EventsLayout>
      <CalendarDatePicker />
      <GoogleButton onClick={login} />
    </EventsLayout>
  )
}
