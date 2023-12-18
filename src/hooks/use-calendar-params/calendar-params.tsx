import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react'

type CalendarParams = {
  timeMin: string
  timeMax: string
}

const defaultState: CalendarParams = {
  timeMin: new Date().toISOString(),
  timeMax: new Date(new Date().getTime() + 180 * 24 * 60 * 60 * 1000).toISOString(),
}

const CalendarParamsDataCtx = createContext<CalendarParams>(defaultState)
const CalendarParamsApiCtx = createContext<Dispatch<SetStateAction<CalendarParams>>>(() => {})

export function CalendarParamsProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [calendarParams, setCalendarParams] = useState<CalendarParams>(defaultState)

  const value = useMemo(() => calendarParams, [calendarParams])

  return (
    <CalendarParamsApiCtx.Provider value={setCalendarParams}>
      <CalendarParamsDataCtx.Provider value={value}>{children}</CalendarParamsDataCtx.Provider>
    </CalendarParamsApiCtx.Provider>
  )
}

export const useCalendarParams = () => useContext(CalendarParamsDataCtx)
export const useSetCalendarParams = () => useContext(CalendarParamsApiCtx)
