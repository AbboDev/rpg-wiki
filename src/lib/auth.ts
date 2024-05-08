import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Reddit from 'next-auth/providers/reddit';
import Twitter from 'next-auth/providers/twitter';
import Facebook from 'next-auth/providers/facebook';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  providers: [
    GitHub,
    Google,
    Reddit({
      authorization: {
        params: {
          duration: 'permanent',
        },
      },
    }),
    Twitter,
    Facebook,
  ],
  basePath: '/auth',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/dashboard') return !!auth;
      return true;
    },
    jwt({ token, trigger, session }) {
      if (trigger === 'update') token.name = session.user.name;
      return token;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
