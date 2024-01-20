import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { ProviderType } from 'next-auth/providers/index'
import { SignInOptions } from 'next-auth/react'
import Select from '@/app/events/select/page'
import { getItem, setItem } from '@/utils/storage'
import { mockEvents } from '../mock-data'

const mockSignIn = jest.fn()
const mockGetEvents = jest.fn()

jest.mock('next-auth/react', () => ({
  signIn: (provider: ProviderType, options: SignInOptions) => mockSignIn(provider, options),
}))

jest.mock('../../../utils/fetch/fetch-events', () => ({
  getEvents: async () => mockGetEvents(),
}))

describe('app/events/select/page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    setItem('calendarParams', {
      timeMin: '2024-01-01T00:00:00.000Z',
      timeMax: '2024-01-31T00:00:00.000Z',
    })
  })

  it('should not render button', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: [] })
    window.localStorage.clear()

    await waitFor(() => render(<Select />))

    expect(screen.queryByTestId('GoogleButton')).not.toBeInTheDocument()
  })

  it('should handle GoogleButton click', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: mockEvents })

    await waitFor(() => render(<Select />))
    await userEvent.click(await screen.findByText('Jan 8th, 2024'))
    await userEvent.click(screen.getByTestId('GoogleButton'))

    expect(mockSignIn).toHaveBeenCalledWith('google', {
      callbackUrl: window.location.origin + '/events/sync',
    })
  })

  it('should handle shift selection - EventCheckbox', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: mockEvents })

    await waitFor(() => render(<Select />))
    await userEvent.click(await screen.findByText('multi-day'))
    userEvent.keyboard('{Shift>}')
    await userEvent.click(await screen.findByText('one-hour'))
    userEvent.keyboard('{/Shift}')
    await userEvent.click(screen.getByTestId('GoogleButton'))

    expect(getItem('events')).toHaveLength(3)
  })

  it('should handle shift selection - DayCheckbox', async () => {
    mockGetEvents.mockResolvedValueOnce({ events: mockEvents })

    await waitFor(() => render(<Select />))
    await userEvent.click(await screen.findByText('multi-day'))
    userEvent.keyboard('{Shift>}')
    await userEvent.click(await screen.findByText('Jan 15th, 2024'))
    userEvent.keyboard('{/Shift}')
    await userEvent.click(screen.getByTestId('GoogleButton'))

    expect(getItem('events')).toHaveLength(4)
  })
})
