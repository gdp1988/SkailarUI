import { FC } from 'react';

interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface LinkProps {
  text: string;
  icon: JSX.Element;
  href: string;
  target: string;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
  return (
    <button
      className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      onClick={onClick}
    >
      <div>{icon}</div>
      <span>{text}</span>
    </button>
  );
};

export const SidebarLink: FC<LinkProps> = ({ text, icon, href, target }) => {
  return (
    <a
      className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10"
      href={href}
      target={target}
    >
      <div>{icon}</div>
      <span>{text}</span>
    </a>
  );
};
