import { CalendarEvents } from '@/components/calendar-events/calendar-events'
import { GoogleLogin } from '@/components/google-login'

export default function Home() {
  return (
    <main className='flex min-h-screen min-w-screen flex-col items-center py-24'>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center text-gray-200'>Google Calendar Sync</h1>
        <p className='text-xl text-center text-gray-300'>
          Sync events between two Google calendars
        </p>
      </div>
      <GoogleLogin />
      <CalendarEvents />
    </main>
  )
}
