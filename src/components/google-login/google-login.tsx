'use client'
import { memo, useCallback } from 'react'
import { signIn } from 'next-auth/react'
import { GoogleIcon } from '../common/icons/google-icon'

function _GoogleLogin() {
  const login = useCallback(() => {
    signIn('google')
  }, [])

  return (
    <button
      className='my-2 flex items-center hover:bg-gray-900 text-gray-200 py-2 px-4 rounded border border-gray-700'
      onClick={login}
    >
      <GoogleIcon />
      Get My Google Token
    </button>
  )
}

export const GoogleLogin = memo(_GoogleLogin)
