import {
  IconBrandGithubFilled,
  IconBrandTwitterFilled,
} from '@tabler/icons-react';
import { FC, useContext, useEffect, useReducer, useRef } from 'react';
import {
  AiOutlineMail as IconMail,
  AiOutlineWhatsApp as IconWhatsApp,
} from 'react-icons/ai';
import { BsTelegram as IconTelegram } from 'react-icons/bs';
import {
  FaReddit as IconBrandReddit,
  FaTwitch as IconBrandTwitch,
} from 'react-icons/fa';
import {
  IoLogoLinkedin as IconBrandLinkedin,
  IoLogoYoutube as IconBrandYouTube,
} from 'react-icons/io';
import {
  SiDiscord as IconBrandDiscord,
  SiInstagram as IconBrandInstagram,
  SiBuymeacoffee as IconBuyMeACoffee,
} from 'react-icons/si';

import { useTranslation } from 'next-i18next';

import { useCreateReducer } from '@/hooks/useCreateReducer';

import { getInfo, saveInfo } from '@/utils/app/info';

import { Info } from '@/types/info';

import HomeContext from '@/pages/api/home/home.context';
import Link from 'next/link';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const InfoDialog: FC<Props> = ({ open, onClose }) => {
  const { t } = useTranslation('settings');
  const info: Info = getInfo();
  const { state, dispatch } = useCreateReducer<Info>({
    initialState: info,
  });
  const { dispatch: homeDispatch } = useContext(HomeContext);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        window.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      window.removeEventListener('mouseup', handleMouseUp);
      onClose();
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  const handleSave = () => {
    homeDispatch({ field: 'lightMode', value: state.theme });
    saveInfo(state);
  };

  // Render nothing if the dialog is not open.
  if (!open) {
    return <></>;
  }

  // Render the dialog.
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="fixed inset-0 z-10 overflow-hidden">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          />

          <div
            ref={modalRef}
            className="dark:border-netural-400 inline-block max-h-[400px] transform overflow-y-auto rounded-lg border border-gray-300 bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-[#202123] sm:my-8 sm:max-h-[600px] sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
            role="dialog"
          >
            <div className="text-sm font-bold mb-4 text-black dark:text-neutral-200">
              <center>{t('Socials')}</center>
            </div>

            <ul className="flex justify-center space-x-4">
              <li>
                <a
                  href="https://github.com/Rzayy"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandGithubFilled
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/edoardo.hb"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandInstagram
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/AmTriiX"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandTwitterFilled
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
            </ul>
            <br />
            <ul className="flex justify-center space-x-4">
              <li>
                <a
                  href="https://bmc.link/amtriix"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBuyMeACoffee
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://discord.skailar.net"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandDiscord
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@SkailarAI"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandYouTube
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
            </ul>
            <br />
            <ul className="flex justify-center space-x-4">
              <li>
                <a
                  href="https://www.reddit.com/user/SkailarAI"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandReddit
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitch.tv/SkailarAI"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandTwitch
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/edoardo-bergamo-40340927a/"
                  target={'_blank'}
                  className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                >
                  <IconBrandLinkedin
                    size={18}
                    className="text-gray-600 dark:text-white"
                  />
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-sm font-bold mb-4 text-black dark:text-neutral-200 text-center">
                {t('Contact')}
              </h3>
              <ul className="flex justify-center space-x-4 mb-4">
                <li>
                  <Link
                    href="mailto:info@skailar.net"
                    target="_blank"
                    className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  >
                    <IconMail
                      size={18}
                      className="text-gray-600 dark:text-white"
                    />
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/17245153162"
                    target="_blank"
                    className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  >
                    <IconWhatsApp
                      size={18}
                      className="text-gray-600 dark:text-white"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/+220QH0AIz6M3YmY0"
                    target="_blank"
                    className="flex items-center justify-center h-10 w-10 rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-neutral-900 dark:hover:bg-neutral-800"
                  >
                    <IconTelegram
                      size={18}
                      className="text-gray-600 dark:text-white"
                    />
                  </a>
                </li>
              </ul>
              <p className="text-xs text-center text-gray-600 dark:text-gray-400">
                *
                {t(
                  'For business inquiries or any other questions, feel free to contact us',
                )}{' '}
                <Link
                  className="underline hover:none"
                  href="mailto:business@skailar.net"
                >
                  {t('here')}
                </Link>
                .*
              </p>
            </div>

            <button
              type="button"
              className="w-full px-4 py-2 mt-6 border rounded-lg shadow border-neutral-500 text-neutral-900 hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:border-opacity-50 dark:bg-white dark:text-black dark:hover:bg-neutral-300"
              onClick={() => {
                onClose();
              }}
            >
              {t('Close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
