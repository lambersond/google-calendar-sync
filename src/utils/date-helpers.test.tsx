import { isMidnightToMidnight } from './date-helpers'

describe('utils/date-helpers', () => {
  it('should return true if midnight', () => {
    const start = new Date(2024, 1, 1, 0, 0, 0)
    const end = new Date(2024, 1, 2, 0, 0, 0)
    expect(isMidnightToMidnight(start, end)).toBe(true)
  })
})
