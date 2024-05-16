import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/src/lib/prisma';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Reddit from 'next-auth/providers/reddit';
import Twitter from 'next-auth/providers/twitter';
import Facebook from 'next-auth/providers/facebook';
import Discord from 'next-auth/providers/discord';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  adapter: PrismaAdapter(prisma),
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
    Discord,
  ],
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error',
  //   verifyRequest: '/auth/verify-request',
  //   newUser: '/auth/new-user'
  // },
  basePath: '/auth',
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === '/dashboard') return !!auth;
      return true;
    },
  },
  session: {
    strategy: 'database',
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
