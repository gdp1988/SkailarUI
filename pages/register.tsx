import Head from 'next/head';
import Link from 'next/link';

import { Register } from '@/components/Forms/Register';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>Register - Skailar</title>
      </Head>
      <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center sm:w-1/3 w-full mt-10 p-10 shadow-md">
          <h1 className="mt-10 mb-4 text-white text-4xl font-bold">Register</h1>
          <Register />
        </div>
      </div>
    </>
  );
}
