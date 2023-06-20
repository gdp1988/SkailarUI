import Head from 'next/head';
import Link from 'next/link';

import {
  DiscordSignInButton,
  GoogleSignInButton,
} from '@/components/ButtonsAuth/authButtons';
import { Login } from '@/components/Forms/Login';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Login - Skailar</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center sm:w-1/3 w-full mt-10 p-10 shadow-md">
          <h1 className="mt-10 mb-4 text-white text-4xl font-bold">Login</h1>
          <Login />
          <span className="text-2xl font-semibold text-white text-center mt-8 mb-8">
            Or
          </span>
          <GoogleSignInButton />
          <DiscordSignInButton />
        </div>
      </div>
    </>
  );
}
