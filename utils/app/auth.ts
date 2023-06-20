import { useSession } from 'next-auth/react';

import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import DiscordProvider from 'next-auth/providers/discord';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import TwitchProvider from 'next-auth/providers/twitch';
import { redirect } from 'next/navigation';

export const authConfig: NextAuthOptions = {
  providers: [
    // CredentialsProvider({
    //   name: 'Login',
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: 'email',
    //       placeholder: 'example@skailar.net',
    //     },
    //     password: { label: "Password", type: 'password' },
    //   },

    //   async authorize(credentials) {
    //     if (!credentials || !credentials.email || !credentials.password)
    //       return null

    //     const dbUser = await prisma.user.findFirst({
    //       where: { email: credentials.email }
    //     });

    //     if (dbUser && dbUser.password === credentials.password) {
    //       const { password, createdAt, id, ...dbUserWithoutPassword } = dbUser
    //       return dbUserWithoutPassword as User
    //     }

    //     return null
    //   }
    // }),

    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID as string,
      clientSecret: process.env.TWITCH_CLIENT_SECRET as string,
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),

    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
};
