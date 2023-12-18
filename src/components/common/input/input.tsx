import { memo } from 'react'

function _Input({ label, onChange }: { label: string; onChange: (value: string) => void }) {
  return (
    <div className='flex flex-col'>
      <label htmlFor={label} className='text-gray-200'>
        {label}
      </label>
      <input
        className='mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 w-full'
        id={label}
        onChange={e => onChange(e.target.value)}
        placeholder='Synced'
      />
    </div>
  )
}

export const Input = memo(_Input)
