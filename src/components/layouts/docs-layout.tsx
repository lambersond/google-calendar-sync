export default function EventsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <h1 className='text-4xl font-bold text-center text-gray-200'>Google Calendar Sync</h1>
      <div className='px-10 py-8'>{children}</div>
    </>
  )
}
