import { Info } from '@/types/info';

const STORAGE_KEY = 'info';

export const getInfo = (): Info => {
  let info: Info = {
    theme: 'dark',
  };
  const infoJson = localStorage.getItem(STORAGE_KEY);
  if (infoJson) {
    try {
      let saveInfo = JSON.parse(infoJson) as Info;
      info = Object.assign(info, saveInfo);
    } catch (e) {
      console.error(e);
    }
  }
  return info;
};

export const saveInfo = (info: Info) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
};
