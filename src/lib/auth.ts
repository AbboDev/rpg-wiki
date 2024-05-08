import NextAuth from 'next-auth';

import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Reddit from 'next-auth/providers/reddit';
import Twitter from 'next-auth/providers/twitter';
import Bungie from 'next-auth/providers/bungie';

import type { NextAuthConfig } from 'next-auth';
import type { OAuthConfig, OAuthUserConfig } from 'next-auth/providers';

function BungieProvider(
  options: OAuthUserConfig<Record<string, any>>,
): OAuthConfig<Record<string, any>> {
  const provider = Bungie(options);

  const BungieProvider: OAuthConfig<Record<string, any>> = {
    ...provider,
    authorization: {
      url: provider.authorization,
      params: { scope: '' },
    },
    userinfo: {
      url: provider.userinfo,
      async request({ tokens, provider }) {
        const url = provider.userinfo?.url;
        if (!(url instanceof URL)) {
          throw new TypeError('"url" must be an instance of URL');
        }

        const membershipUrl = decodeURI(url.href).replace(
          '{membershipId}',
          tokens.membership_id,
        );

        return await fetch(membershipUrl, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            'X-API-Key': process.env.AUTH_BUNGIE_API_KEY,
          },
        }).then(async (res) => await res.json());
      },
    },
  };

  return BungieProvider;
}

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
    BungieProvider,
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
