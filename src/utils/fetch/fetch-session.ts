export const getSession = async () => {
  const res = await fetch('/api/auth/session', {
    credentials: 'include',
  })
  return await res.json()
}
