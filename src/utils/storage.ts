export const getItem = (key: string) => {
  if (typeof window === 'undefined') return null
  const item = window.localStorage.getItem(key)
  if (!item) return null
  return JSON.parse(item)
}

export const setItem = (key: string, value: any) => {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(key, JSON.stringify(value))
}
