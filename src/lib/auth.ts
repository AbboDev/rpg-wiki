import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  providers: [GitHub],
  basePath: '/auth',
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
