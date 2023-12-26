import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProviderType } from 'next-auth/providers/index'
import { SignInOptions } from 'next-auth/react'
import Home from '@/app/page'

const mockSignIn = jest.fn()

jest.mock('next-auth/react', () => ({
  signIn: (provider: ProviderType, options: SignInOptions) => mockSignIn(provider, options),
}))

describe('app/page', () => {
  it('should handle login', async () => {
    render(<Home />)

    await userEvent.click(screen.getByTestId('GoogleButton'))

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      callbackUrl: window.location.origin + '/events/select',
    })
  })
})
