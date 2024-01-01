'use client'
import { CalendarListContainer } from '@/components/calendar-events/calendar-list-container'
import { SaveAndLoginButton } from '@/components/save-and-login-button'
import { EventsProvider } from '@/hooks/use-events-sync'

export default function Select() {
  return (
    <EventsProvider>
      <CalendarListContainer />
      <SaveAndLoginButton />
    </EventsProvider>
  )
}
