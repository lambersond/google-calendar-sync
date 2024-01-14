'use client'
import { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { CalendarDatePicker } from '@/components/calendar-date-picker'
import { GoogleButton } from '@/components/google-button'

export default function Home() {
  const login = useCallback(() => {
    signIn('google', { callbackUrl: window.location.origin + '/events/select' })
  }, [])

  return (
    <>
      <CalendarDatePicker />
      <GoogleButton onClick={login} />
    </>
  )
}
