'use client';

import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CredentialsFormProps {
  csrfToken?: string;
}

export function Login(props: CredentialsFormProps) {
  useEffect(() => {
    const docTitle = document.title;

    const handleBlur = () => {
      document.title = 'Bro u have to login';
    };

    const handleFocus = () => {
      document.title = docTitle;
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Clean up the event listeners
    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push('/');
    } else {
      setError('Sign in failed. Check the details you provided are correct.');
    }
  };

  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
      className="w-full mt-8 text-xl text-black font-semibold flex flex-col"
    >
      {error && (
        <p className="p-4 mb-2 text-lg font-semibold rounded-md text-white bg-red-500">
          {error}
        </p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full px-4 py-4 mb-4 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full h-12 px-6 mt-4 text-lg transition-all bg-blue-600 rounded-lg focus:shadow-outline text-white"
      >
        Login
      </button>
      <div className="text-white mt-5 items-center justify-center ">
        Don&apos;t have an account?{' '}
        <Link
          className="underline w-full h-12 text-lg rounded-lg text-white hover:text-blue-800"
          href="/register"
        >
          Register here
        </Link>
      </div>
    </form>
  );
}
