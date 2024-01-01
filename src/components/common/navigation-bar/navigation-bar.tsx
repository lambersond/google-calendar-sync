import Link from 'next/link'
import { CalendarSyncIcon } from '../icons/calendar-sync-icon'
import { DocsIcon } from '../icons/docs-icon'

export function NavigationBar() {
  return (
    <div className='fixed top-0 left-0 w-full h-16 shadow-nav bg-zinc-900'>
      <div className='flex items-center h-full max-w-screen-xl mx-auto px-4 justify-between'>
        <Link href='/' className='flex gap-4 items-center'>
          <CalendarSyncIcon width={48} height={48} fill='#FFF' />
          <p className='text-2xl font-bold text-slate-200'>Google Calendar Sync</p>
        </Link>
        <Link href='/docs' className='flex items-center gap-2'>
          <DocsIcon width={24} height={23} fill='#FFF' />
          <p className='text-lg font-bold text-slate-200'>Docs</p>
        </Link>
      </div>
    </div>
  )
}
