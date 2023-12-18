import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          // TODO: Are all these scopes needed?
          scope:
            'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, account }) {
      token.accessToken = account?.access_token ?? ''
      token.exp = account?.expires_at ?? Date.now() / 1000 + 3600

      return token
    },
  },
} satisfies NextAuthOptions

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
