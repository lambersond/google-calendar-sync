import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Sync from '@/app/events/sync/page'
import { setItem } from '@/utils/storage'
import { mockEvents } from '../mock-data'

describe('app/events/select/page', () => {
  const mockFetch = jest.fn()
  const unmockedFetch = global.fetch

  setItem('events', mockEvents)

  beforeAll(() => {
    global.fetch = () =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetch()),
      } as Response)
  })

  afterAll(() => {
    global.fetch = unmockedFetch
  })

  it('should not show progress bar', () => {
    render(<Sync />)

    expect(screen.queryByTestId('progress-bar__outer')).not.toBeInTheDocument()
  })

  it('should render progress bar', async () => {
    render(<Sync />)

    await userEvent.type(screen.getByPlaceholderText('Synced'), 'test')
    await userEvent.click(screen.getByText('Sync Events'))

    expect(screen.getByTestId('progress-bar__inner')).toHaveStyle({ width: '100%' })
  })
})
