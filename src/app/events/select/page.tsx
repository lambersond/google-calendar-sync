'use client'
import { CalendarList } from '@/components/events/select/calendar-list'
import { SaveAndLoginButton } from '@/components/save-and-login-button'
import { EventsProvider } from '@/hooks/use-events-sync'

export default function Select() {
  return (
    <EventsProvider>
      <div className='w-full'>
        <CalendarList />
      </div>
      <SaveAndLoginButton />
    </EventsProvider>
  )
}
