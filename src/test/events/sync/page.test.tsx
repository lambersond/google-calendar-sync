import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import Sync from '@/app/events/sync/page'

const mockPostEvents = jest.fn()

jest.mock('../../../utils/fetch/fetch-events', () => ({
  postEvents: async (prefix: string) => mockPostEvents(prefix),
}))

describe('app/events/select/page', () => {
  it('should not render button', async () => {
    mockPostEvents.mockResolvedValueOnce([])

    render(<Sync />)
    await userEvent.type(screen.getByPlaceholderText('Synced'), 'test')
    await userEvent.click(screen.getByText('Sync Events'))

    expect(mockPostEvents).toHaveBeenCalledWith('test')
  })
})
