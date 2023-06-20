import {
  IconFileExport,
  IconInfoCircle,
  IconSettings,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import {
  BiHelpCircle as IconHelp,
  BiLogOut as IconLogout,
  BiUser as IconUser,
  BiLogIn as IconLogin,
} from 'react-icons/bi';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import HomeContext from '@/pages/api/home/home.context';

import { InfoDialog } from '@/components/Settings/InfoDialog';
import { SettingDialog } from '@/components/Settings/SettingDialog';

import { Import } from '../../Settings/Import';
import { Key } from '../../Settings/Key';
import { SidebarButton, SidebarLink } from '../../Sidebar/SidebarButton';
import ChatbarContext from '../Chatbar.context';
import { ClearConversations } from './ClearConversations';
import { PluginKeys } from './PluginKeys';

export const ChatbarSettings = () => {
  const { t } = useTranslation('sidebar');
  const [isSettingDialogOpen, setIsSettingDialog] = useState<boolean>(false);
  const [isInfoDialogOpen, setIsInfoDialog] = useState<boolean>(false);
  const [isProfileDialog, setIsProfileDialog] = useState<boolean>(false);

  const {
    state: {
      apiKey,
      lightMode,
      serverSideApiKeyIsSet,
      serverSidePluginKeysSet,
      conversations,
    },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const {
    handleClearConversations,
    handleImportConversations,
    handleExportData,
    handleApiKeyChange,
  } = useContext(ChatbarContext);

  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center space-y-1 border-t border-white/20 pt-1 text-sm">
      {conversations.length > 0 ? (
        <ClearConversations onClearConversations={handleClearConversations} />
      ) : null}

      <Import onImport={handleImportConversations} />

      <SidebarButton
        text={t('Export data')}
        icon={<IconFileExport size={18} />}
        onClick={() => handleExportData()}
      />

      <SidebarButton
        text={t('Settings')}
        icon={<IconSettings size={18} />}
        onClick={() => setIsSettingDialog(true)}
      />

      <SidebarButton
        text={t('Informations')}
        icon={<IconInfoCircle size={18} />}
        onClick={() => setIsInfoDialog(true)}
      />

      <SidebarLink
        text={t('Help')}
        icon={<IconHelp size={18} />}
        href="https://help.openai.com/en/collections/3742473-chatgpt"
        target={'_blank'}
      />

      {session ? (
        <div className="w-full text-left rounded-lg border border-neutral-200 border-dashed hover:border-solid bg-transparent text-neutral-900 dark:border-neutral-600 dark:text-white">
          <SidebarButton
            text={session?.user?.email as string}
            // eslint-disable-next-line @next/next/no-img-element
            icon={session?.user?.image ? <img src={session.user.image} alt={session.user.image} style={{width: '18px'}} /> : <IconUser size={18} />}
            onClick={() => handleLogout()}
          />
        </div>
      ) : (
        <div className="w-full text-left rounded-lg border border-neutral-200 border-dashed hover:border-solid bg-transparent text-neutral-900 dark:border-neutral-600 dark:text-white">
          <SidebarLink
            text={t('Login')}
            icon={<IconLogin />}
            href='/login'
            target=''
          />
        </div>
      )}

      {!serverSideApiKeyIsSet ? (
        <Key apiKey={apiKey} onApiKeyChange={handleApiKeyChange} />
      ) : null}

      {!serverSidePluginKeysSet ? <PluginKeys /> : null}

      <SettingDialog
        open={isSettingDialogOpen}
        onClose={() => {
          setIsSettingDialog(false);
        }}
      />

      <InfoDialog
        open={isInfoDialogOpen}
        onClose={() => {
          setIsInfoDialog(false);
        }}
      />
    </div>
  );
};
