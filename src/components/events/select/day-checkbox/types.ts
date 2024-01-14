export type DayCheckboxProps = {
  dayString: string
  indeterminate: boolean
  checked: boolean
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
