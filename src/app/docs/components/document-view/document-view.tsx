import { Document } from '../../types'

const contentClassName = 'text-lg text-slate-100 pl-4'
const titleClassName = 'text-2xl text-slate-200'

export function DocumentView({ document }: Readonly<{ document: Document }>) {
  const { effectiveDate, lastUpdated, title, content } = document

  return (
    <div className='flex flex-col w-full gap-6'>
      <section>
        <p className='text-4xl text-slate-200'>{title}</p>
        <li className={contentClassName}>Effective Date: {effectiveDate}</li>
        <li className={contentClassName}>Last Updated: {lastUpdated}</li>
      </section>
      {content.map(({ title, content }) => (
        <section key={title}>
          <p className={titleClassName}>{title}</p>
          {content.map(item => (
            <li key={item} className={contentClassName}>
              {item}
            </li>
          ))}
        </section>
      ))}
      <section>
        <p className={titleClassName}>Contact Us</p>
        <li className={contentClassName}>
          If you have any questions, please contact us at{' '}
          <a
            href='mailto:sync.calendar.webapp@gmail.com'
            className='italic underline hover:underline-offset-2'
          >
            sync.calendar.webapp@gmail.com
          </a>
        </li>
      </section>
    </div>
  )
}
