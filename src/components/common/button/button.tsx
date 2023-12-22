import { type ButtonHTMLAttributes, type MouseEvent, useCallback, useRef, memo } from 'react'

function _Button({
  onClick,
  children,
  className = '',
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'ref'> & {
  onClick(event: MouseEvent): void
}) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (buttonRef.current) {
        const rippleElement = document.createElement('span')
        const diameter = Math.max(event.currentTarget.clientWidth, event.currentTarget.clientHeight)
        const radius = diameter / 2

        rippleElement.style.width = rippleElement.style.height = `${diameter}px`
        rippleElement.style.left = `${event.clientX - (buttonRef.current.offsetLeft + radius)}px`
        rippleElement.style.top = `${event.clientY - (buttonRef.current.offsetTop + radius)}px`
        rippleElement.classList.add('ripple')
        event.currentTarget.appendChild(rippleElement)

        setTimeout(() => {
          buttonRef?.current?.removeChild(rippleElement)
        }, 600)
      }

      onClick && onClick(event)
    },
    [onClick],
  )

  return (
    <button
      className={`overflow-hidden relative ${className}`}
      onClick={handleClick}
      ref={buttonRef}
      {...props}
    >
      {children}
    </button>
  )
}

export const Button = memo(_Button)
