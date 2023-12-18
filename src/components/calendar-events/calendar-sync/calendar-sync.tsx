import { memo, useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Input } from '@/components/common/input'
import { useEvents } from '@/hooks/use-events-sync'
import { postEvents } from '@/utils/fetch/fetch-events'

function _CalendarSync() {
  const [preface, setPreface] = useState('')
  const events = useEvents()

  const onInputChange = useCallback((value: string) => {
    setPreface(value)
  }, [])

  const onSyncClick = async () => {
    await signIn('google', { callbackUrl: window.location.href }).then(() => {
      postEvents(events, preface)
    })
  }

  return (
    <div className='flex flex-col gap-2'>
      <Input label='Preface' onChange={onInputChange} />
      <button className='border border-gray-200 p-4 text-gray-200 rounded' onClick={onSyncClick}>
        Sync to Google Calendar
      </button>
    </div>
  )
}

export const CalendarSync = memo(_CalendarSync)
