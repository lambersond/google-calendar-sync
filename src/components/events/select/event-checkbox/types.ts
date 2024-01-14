import type { SyncEvent } from '@/types'

export type EventCheckboxProps = {
  event: SyncEvent
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}
