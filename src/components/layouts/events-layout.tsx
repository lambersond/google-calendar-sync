export default function EventsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className='flex flex-col items-center'>
        <h1 className='text-4xl font-bold text-center text-gray-200'>Google Calendar Sync</h1>
        <p className='text-xl text-center text-gray-300'>
          Sync events between two Google calendars
        </p>
      </div>
      {children}
    </>
  )
}
