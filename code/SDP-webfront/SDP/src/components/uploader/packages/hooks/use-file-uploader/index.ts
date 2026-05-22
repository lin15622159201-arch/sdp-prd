import { FileUploader } from '@myna/file-uploader';
import { useAccountStore } from '@/store/account';
import { useAppStore } from '@/store/app';
import { watchEffect } from 'vue';
import { SYSTEM_ENUM } from '@/core/http/env';

const fileUploader = new FileUploader();
fileUploader.setInterceptors(({ request }) => {
  request.use((config) => {
    if (config.url) {
      config.url = config.url?.replace('/api/', '/communal/');
    }
    return config;
  });
});

export default function useFileUploader() {
  const accountStore = useAccountStore();
  const appStore = useAppStore();

  watchEffect(() => {
    const axiosConfig = {
      headers: {
        Authorization: accountStore.token ? `Bearer ${accountStore.token}` : '',
      },
    };

    const systemDomainMap = {
      ...appStore.systemDomain || {},
      'arsenal-api': appStore.systemDomain?.['arsenal-api']?.replace('xiniu-', '') || '',
    };

    fileUploader.setOptions({
      errorCapture: true,
      axiosConfig,
      server: SYSTEM_ENUM.ARSENAL_API,
      systemDomainMap,
      threshold: 1024 * 1024 * 20,
    });
  });

  return {
    fileUploader,
  };
}
