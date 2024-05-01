import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import type { NextAuthConfig } from 'next-auth';

export const config = {
  providers: [GitHub, Google],
  basePath: '/auth',
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
