import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Calendar } from '.'

describe('components/calendar', () => {
  const startingDate = new Date(2023, 11, 25, 0, 0, 0)

  it('should render', () => {
    render(<Calendar onChange={jest.fn} startingDate={startingDate} />)

    expect(screen.getByText(/December 2023/)).toBeInTheDocument()
    expect(screen.getByText('25')).toBeInTheDocument()
    expect(screen.getAllByText('30')).toHaveLength(2)
  })

  it('should handle onChange', async () => {
    const mockOnChange = jest.fn()
    render(<Calendar onChange={mockOnChange} startingDate={startingDate} />)

    await userEvent.click(screen.getByText('25'))
    await userEvent.click(screen.getByText('31'))

    expect(mockOnChange).toHaveBeenCalledTimes(2)
    expect(mockOnChange).toHaveBeenNthCalledWith(1, [new Date(2023, 11, 25), null])
    expect(mockOnChange).toHaveBeenNthCalledWith(2, [
      new Date(2023, 11, 25),
      new Date(2023, 11, 31),
    ])
  })

  it('should go to next month', async () => {
    render(<Calendar onChange={jest.fn} startingDate={startingDate} />)

    await userEvent.click(screen.getByTestId('ArrowRightIcon'))

    expect(screen.getByText(/January 2024/)).toBeInTheDocument()
  })

  it('should go to previous month', async () => {
    render(<Calendar onChange={jest.fn} startingDate={startingDate} />)

    await userEvent.click(screen.getByTestId('ArrowLeftIcon'))

    expect(screen.getByText(/November 2023/)).toBeInTheDocument()
  })
})
