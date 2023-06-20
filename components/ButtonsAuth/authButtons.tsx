'use client';

import { Icon } from '@iconify/react';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

import Image from 'next/image';

import Spinner from '@/components/Spinner/Spinner';

import discordLogo from '@/public/discord.png';
import githubLogo from '@/public/github.png';
import googleLogo from '@/public/google.png';
import twitchLogo from '@/public/twitch.png';

export function GoogleSignInButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signIn('google');
  };

  const handlePopupClose = () => {
    setLoading(false);
  };

  if (session) {
    window.location.assign('/');
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`hidden w-full sm:flex items-center font-semibold justify-center h-14 mb-5 px-6 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200 ${
          loading ? 'loading' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-text">
            <Icon
              icon="eos-icons:three-dots-loading"
              style={{ fontSize: '40px' }}
            />
          </div>
        ) : (
          <>
            <Image
              src={googleLogo}
              alt="Google Logo"
              className="hidden sm:inline-block w-8 h-8"
            />
            <span className="hidden sm:inline-block ml-4">
              Continue with Google
            </span>
          </>
        )}
      </button>
      <div className="sm:hidden m-5 w-96">
        <center>
          <button onClick={handleClick} className="flex sm:hidden">
            {loading ? (
              <div className="flex justify-center items-center w-14 h-14 rounded-lg p-2 bg-white">
                <Spinner />
              </div>
            ) : (
              <Image
                src={googleLogo}
                className="rounded-lg p-2 bg-white w-14 h-14"
                alt="Google Logo"
              />
            )}
          </button>
        </center>
      </div>
      <div data-callback="handlePopupClose"></div>
    </>
  );
}

export function GithubSignInButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signIn('github');
  };

  const handlePopupClose = () => {
    setLoading(false);
  };

  if (session) {
    return (
      <p className="text-semibold text-white m-1 pt-5">
        You are already signed in.
      </p>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`hidden w-full sm:flex items-center font-semibold justify-center h-14 px-6 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200 ${
          loading ? 'loading' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-text">
            <Icon
              icon="eos-icons:three-dots-loading"
              style={{ fontSize: '40px' }}
            />
          </div>
        ) : (
          <>
            <Image
              src={githubLogo}
              alt="Google Logo"
              className="hidden sm:inline-block w-8 h-8"
            />
            <span className="hidden sm:inline-block ml-4">
              Continue with Github
            </span>
          </>
        )}
      </button>
      <div className="m-5 w-96">
        <center>
          <button onClick={handleClick} className="flex sm:hidden">
            {!loading ? (
              <Image
                src={githubLogo}
                className="rounded-lg p-2 bg-white w-14 h-14"
                alt="Github Logo"
              />
            ) : (
              <div className="flex justify-center items-center w-14 h-14 rounded-lg p-2 bg-white">
                <Spinner />
              </div>
            )}
          </button>
        </center>
      </div>
      <div data-callback="handlePopupClose"></div>
    </>
  );
}

export function TwitchSignInButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signIn('twitch');
  };

  const handlePopupClose = () => {
    setLoading(false);
  };

  if (session) {
    return (
      <p className="text-semibold text-white m-1 pt-5">
        You are already signed in.
      </p>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`hidden w-full sm:flex items-center font-semibold justify-center h-14 px-6 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200 ${
          loading ? 'loading' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-text">
            <Icon
              icon="eos-icons:three-dots-loading"
              style={{ fontSize: '40px' }}
            />
          </div>
        ) : (
          <>
            <Image
              src={twitchLogo}
              alt="Twitch Logo"
              className="hidden sm:inline-block w-8"
            />
            <span className="hidden sm:inline-block ml-4">
              Continue with Twitch
            </span>
          </>
        )}
      </button>
      <div className="m-5 w-96">
        <center>
          <button onClick={handleClick} className="flex sm:hidden">
            {loading ? (
              <div className="flex justify-center items-center w-14 h-14 rounded-lg p-2 bg-white">
                <Spinner />
              </div>
            ) : (
              <Image
                src={twitchLogo}
                className="rounded-lg p-2 bg-white w-14"
                alt="Twitch Logo"
              />
            )}
          </button>
        </center>
      </div>
      <div data-callback="handlePopupClose"></div>
    </>
  );
}

export function DiscordSignInButton() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    signIn('discord');
  };

  const handlePopupClose = () => {
    setLoading(false);
  };

  if (session) {
    return (
      <p className="text-semibold text-white m-1 pt-5">
        You are already signed in.
      </p>
    );
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`hidden w-full sm:flex items-center font-semibold justify-center h-14 px-6 text-xl transition-colors duration-300 bg-white border-2 border-black text-black rounded-lg focus:shadow-outline hover:bg-slate-200 ${
          loading ? 'loading' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="loading-text">
            <Icon
              icon="eos-icons:three-dots-loading"
              style={{ fontSize: '40px' }}
            />
          </div>
        ) : (
          <>
            <Image
              src={discordLogo}
              alt="Google Logo"
              className="hidden sm:inline-block ml-2 w-8"
            />
            <span className="hidden sm:inline-block ml-4">
              Continue with Discord
            </span>
          </>
        )}
      </button>
      <div className="m-5 w-96">
        <center>
          <button onClick={handleClick} className="flex sm:hidden">
            {loading ? (
              <div className="flex justify-center items-center w-14 h-14 rounded-lg p-2 bg-white">
                <Spinner />
              </div>
            ) : (
              <Image
                src={discordLogo}
                className="rounded-lg p-2 bg-white w-14"
                alt="Discord Logo"
              />
            )}
          </button>
        </center>
      </div>
      <div data-callback="handlePopupClose"></div>
    </>
  );
}

export function CredentialsSignInButton() {
  const handleClick = () => {
    signIn('credentials');
  };
}
