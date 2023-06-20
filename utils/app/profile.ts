import { Profile } from '@/types/profile';

const STORAGE_KEY = 'profile';

export const getProfile = (): Profile => {
  let profile: Profile = {
    theme: 'dark',
  };
  const profileJson = localStorage.getItem(STORAGE_KEY);
  if (profileJson) {
    try {
      let saveProfile = JSON.parse(profileJson) as Profile;
      profile = Object.assign(profile, saveProfile);
    } catch (e) {
      console.error(e);
    }
  }
  return profile;
};

export const saveProfile = (profile: Profile) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
};
