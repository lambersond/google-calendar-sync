import { endOfDay, endOfToday, startOfToday } from 'date-fns'
import { CALENDAR_PARAMS } from '@/constants'
import { getItem } from '@/utils/storage'
import { setDateRange } from './helpers'

describe('components/calendar-date-picker/helpers', () => {
  const date1 = new Date(2021, 0, 1)
  const date2 = new Date(2021, 0, 3)

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should set min/max when 2 params provided', () => {
    setDateRange([date1, date2])

    expect(getItem(CALENDAR_PARAMS)).toEqual({
      timeMin: date1.toISOString(),
      timeMax: endOfDay(date2).toISOString(),
    })
  })

  it('should set min/max when 1 params provided', () => {
    setDateRange([null, date2])

    expect(getItem(CALENDAR_PARAMS)).toEqual({
      timeMin: date2.toISOString(),
      timeMax: endOfToday().toISOString(),
    })
  })

  it('should set min/max when 0 params provided', () => {
    setDateRange([null, null])

    expect(getItem(CALENDAR_PARAMS)).toEqual({
      timeMin: startOfToday().toISOString(),
      timeMax: endOfToday().toISOString(),
    })
  })
})
