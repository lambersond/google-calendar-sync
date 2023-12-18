import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function GET(req: NextRequest) {
  const token = await getToken({ req })
  return new NextResponse(JSON.stringify({ hasToken: (token?.exp as number) > Date.now() / 1000 }))
}
