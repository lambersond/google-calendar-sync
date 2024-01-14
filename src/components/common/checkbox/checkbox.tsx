import { type InputHTMLAttributes, useRef, useEffect, memo } from 'react'

const _Checkbox = ({
  indeterminate = false,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'ref'> & { indeterminate?: boolean }) => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  return (
    <input
      ref={inputRef}
      type='checkbox'
      className='mr-4 w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-red-600 dark:focus:primary dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer'
      {...props}
    />
  )
}

export const Checkbox = memo(_Checkbox)
