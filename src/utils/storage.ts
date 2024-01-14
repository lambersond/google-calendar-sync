export const getItem = (key: string) => {
  if (typeof window === 'undefined') return null
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const setItem = (key: string, value: any) => {
  typeof window !== 'undefined' && window.localStorage.setItem(key, JSON.stringify(value))
}
