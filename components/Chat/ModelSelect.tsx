import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { OpenAIModel } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';

export const ModelSelect = () => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, models, defaultModelId },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'model',
        value: models.find(
          (model) => model.id === e.target.value,
        ) as OpenAIModel,
      });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full text-left p-2 rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <span className="w-full bg-transparent text-neutral-700 dark:text-neutral-400">
          {t(
            'Skailar is a state-of-the-art language model based on the cutting-edge GPT (Generative Pre-trained Transformer) architecture. With its unparalleled ability to generate human-like text, Skailar can produce content on a wide variety of topics that is both informative and engaging. Whether you need help with writing, research, or any other task that requires natural language processing, Skailar is the perfect tool for the job. Thanks to its advanced machine learning algorithms and sophisticated neural network architecture, Skailar can understand complex concepts and generate text that is both fluent and accurate. So why waste time struggling to write on your own, when you can have the power of Skailar at your fingertips?',
          )}
        </span>
      </div>
    </div>
  );
};
