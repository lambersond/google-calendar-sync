import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProviderType } from 'next-auth/providers/index'
import { SignInOptions } from 'next-auth/react'
import Select from '@/app/events/select/page'

const mockSignIn = jest.fn()
const mockGetEvents = jest.fn()

jest.mock('next-auth/react', () => ({
  signIn: (provider: ProviderType, options: SignInOptions) => mockSignIn(provider, options),
}))

jest.mock('../../../utils/fetch/fetch-events', () => ({
  getEvents: async () => mockGetEvents(),
}))

describe('app/events/select/page', () => {
  it('should not render button', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: [] })

    await waitFor(() => render(<Select />))

    expect(screen.queryByTestId('GoogleButton')).not.toBeInTheDocument()
  })

  it('should handle GoogleButton click', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: [{ id: 'foo', summary: 'test' }] })

    await waitFor(() => render(<Select />))
    await userEvent.click(screen.getByText('test'))
    await userEvent.click(screen.getByTestId('GoogleButton'))

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      callbackUrl: window.location.origin + '/events/sync',
    })
  })
})
