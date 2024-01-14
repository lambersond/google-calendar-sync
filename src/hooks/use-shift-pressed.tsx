import { useEffect, useState } from 'react'

export const useShiftPressed = () => {
  const [shiftPressed, setShiftPressed] = useState(false)

  useEffect(() => {
    const onKeyPress = ({ shiftKey }: KeyboardEvent) => setShiftPressed(shiftKey)

    document.addEventListener('keydown', onKeyPress)
    document.addEventListener('keyup', onKeyPress)

    return () => {
      document.removeEventListener('keydown', onKeyPress)
      document.removeEventListener('keyup', onKeyPress)
    }
  }, [])

  return shiftPressed
}
