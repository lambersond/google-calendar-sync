export const hasToken = async () => {
  const response = await fetch('/api/auth/token-status', { credentials: 'include' })
  const status = await response.json()
  return Boolean(status?.hasToken)
}
