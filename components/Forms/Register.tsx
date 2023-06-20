import { signIn } from 'next-auth/react';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

interface CredentialsFormProps {
  csrfToken?: string;
}

export function Register(props: CredentialsFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);

    const email = data.get('email') as string;
    if (!email) {
      setError('Invalid email');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      setLoading(false);
      return;
    }

    const password = data.get('password') as string;
    if (!password || password.length < 10) {
      setError('Password must be at least 10 characters long');
      setLoading(false);
      return;
    }
    
    if (password.length > 20) {
      setError('Password must be maximum 20 characters long');
      setLoading(false);
      return;
    }
    
    if (/\s/.test(password)) {
      setError('Password cannot contain whitespace characters');
      setLoading(false);
      return;
    }
    
    if (/[<>]/.test(password)) {
      setError('Password cannot contain angle brackets');
      setLoading(false);
      return;
    }
    
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter');
      setLoading(false);
      return;
    }
    
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter');
      setLoading(false);
      return;
    }
    
    if ((password.match(/[!@#$%^&*]/g) || []).length < 2) {
      setError('Password must contain at least two special characters');
      setLoading(false);
      return;
    }
    
    if ((password.match(/\d/g) || []).length < 2) {
      setError('Password must contain at least two numbers');
      setLoading(false);
      return;
    }
    
    const registrationResponse = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (registrationResponse.ok) {
      setLoading(true);
      const signInResponse = await signIn('credentials', {
        email: email,
        password: password,
        redirect: false,
      });

      if (signInResponse && !signInResponse.error) {
        router.push('/');
        const emailResponse = await fetch('/api/v1/sendMail', {
          method: 'POST',
          body: JSON.stringify({ email: email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (emailResponse.ok) {
          console.log('Email sent successfully');
        } else {
          console.error('Error sending email');
        }
      } else {
        setError(
          'Registration successful, but sign in failed. Please try signing in.',
        );
      }
    } else {
      const { error } = await registrationResponse.json();
      setError(
        error || 'Registration failed. Please check the details you provided.',
      );
    }
    setLoading(false);
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
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Register'}
      </button>

      <div className="text-white mt-5 items-center justify-center ">
        Already have an account?{' '}
        <Link
          className="underline w-full h-12 text-lg rounded-lg text-white hover:text-blue-800"
          href="/login"
        >
          Login here
        </Link>
      </div>
    </form>
  );
}
