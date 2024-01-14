import { memo } from 'react'

const _Superscript = ({
  days = 0,
  midnightToMidnight,
}: {
  days?: number
  midnightToMidnight: boolean
}) => {
  if (!days || (midnightToMidnight && days < 2)) return null

  return <sup>+{days}</sup>
}

export const Superscript = memo(_Superscript)
