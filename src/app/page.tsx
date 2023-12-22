'use client'
import { useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { CalendarDatePicker } from '@/components/calendar-events/calendar-date-picker'
import { Button } from '@/components/common/button'
import { GoogleIcon } from '@/components/common/icons/google-icon'

export default function Home() {
  const login = useCallback(() => {
    signIn('google', { callbackUrl: window.location.origin + '/events/select' })
  }, [])

  return (
    <>
      <CalendarDatePicker />
      <Button
        onClick={login}
        className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      >
        <GoogleIcon />
        Select Your Account
      </Button>
    </>
  )
}
