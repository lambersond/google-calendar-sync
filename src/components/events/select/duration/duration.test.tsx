import { render, screen } from '@testing-library/react'
import { Duration } from '.'

const mockIsMidnightToMidnight = jest.fn()
const mockParseEventDateFieldToDateTime = jest.fn()

jest.mock('../../../../utils/date-helpers', () => ({
  isMidnightToMidnight: () => mockIsMidnightToMidnight(),
  parseEventDateFieldToDateTime: () => mockParseEventDateFieldToDateTime(),
}))

describe('components/events/select/duration/duration.tsx', () => {
  it('should render All Day for no datetime', () => {
    mockIsMidnightToMidnight.mockReturnValueOnce(false)
    mockParseEventDateFieldToDateTime.mockReturnValue(new Date(2024, 1, 1, 0, 0, 0))

    render(<Duration start={{}} end={{}} />)

    expect(screen.getByText('All Day')).toBeInTheDocument()
  })

  it('should render All Day for midnight to midnight', () => {
    mockIsMidnightToMidnight.mockReturnValueOnce(true)
    mockParseEventDateFieldToDateTime.mockReturnValue(new Date(2024, 1, 1, 0, 0, 0))

    render(<Duration start={{ dateTime: 'foo' }} end={{ dateTime: 'bar' }} />)

    expect(screen.getByText('All Day')).toBeInTheDocument()
    expect(screen.queryByText(/\+1/)).not.toBeInTheDocument()
  })

  it('should render superscript', () => {
    mockIsMidnightToMidnight.mockReturnValueOnce(false)
    mockParseEventDateFieldToDateTime.mockReturnValueOnce(new Date(2024, 1, 1, 10, 0, 0))
    mockParseEventDateFieldToDateTime.mockReturnValueOnce(new Date(2024, 1, 3, 14, 0, 0))

    render(<Duration start={{ dateTime: 'foo' }} end={{ dateTime: 'bar' }} />)

    expect(screen.queryByText('All Day')).not.toBeInTheDocument()
    expect(screen.getByText(/\+2/)).toBeInTheDocument()
  })

  it('should render superscript for midnight to midnight & duration.days 1 2', () => {
    mockIsMidnightToMidnight.mockReturnValueOnce(true)
    mockParseEventDateFieldToDateTime.mockReturnValueOnce(new Date(2024, 1, 1, 0, 0, 0))
    mockParseEventDateFieldToDateTime.mockReturnValueOnce(new Date(2024, 1, 3, 0, 0, 0))

    render(<Duration start={{ dateTime: 'foo' }} end={{ dateTime: 'bar' }} />)

    expect(screen.getByText('All Day')).toBeInTheDocument()
    expect(screen.getByText(/\+2/)).toBeInTheDocument()
  })
})
