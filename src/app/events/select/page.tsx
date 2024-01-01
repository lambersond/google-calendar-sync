'use client'
import { CalendarListContainer } from '@/components/calendar-events/calendar-list-container'
import { EventsLayout } from '@/components/layouts'
import { SaveAndLoginButton } from '@/components/save-and-login-button'
import { EventsProvider } from '@/hooks/use-events-sync'

export default function Select() {
  return (
    <EventsLayout>
      <EventsProvider>
        <CalendarListContainer />
        <SaveAndLoginButton />
      </EventsProvider>
    </EventsLayout>
  )
}
