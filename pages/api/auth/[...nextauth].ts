import { NextApiRequest, NextApiResponse } from 'next';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/lib/prisma';
import { compare } from 'bcrypt';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          throw new Error('Missing username or password');
        }
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password');
        }
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ];

  return await NextAuth(req, res, {
    providers,
  });
}
