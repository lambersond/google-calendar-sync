import { DocsLayout } from '@/components/layouts'

export default function PrivacyPolicy() {
  return (
    <DocsLayout>
      <div className='flex flex-col w-full gap-6 items-center'>
        <p className='text-4xl text-slate-200'>Documents</p>
        <ul className='text-lg text-slate-100 flex flex-col items-center'>
          <li className='underline underline-offset-2'>
            <a href='/docs/privacy-policy'>Privacy Policy</a>
          </li>
          <li className='underline underline-offset-2'>
            <a href='/docs/terms-of-service'>Terms of Service</a>
          </li>
        </ul>
      </div>
    </DocsLayout>
  )
}
