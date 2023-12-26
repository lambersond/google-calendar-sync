'use client'
import { memo, type MouseEvent } from 'react'
import { Button } from '@/components/common/button'
import { GoogleIcon } from '@/components/common/icons/google-icon'

function _GoogleButton({ onClick }: { onClick: (event: MouseEvent<HTMLButtonElement>) => void }) {
  return (
    <Button
      onClick={onClick}
      className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      data-testid='GoogleButton'
    >
      <GoogleIcon />
      Select Your Account
    </Button>
  )
}

export const GoogleButton = memo(_GoogleButton)
