declare global {
  interface Window {
    sourceUrl: string;
    targetUrl: string;
  }
}

const SOURCE_URL = 'sourceUrl';
const TARGET_URL = 'targetUrl';
const FALLBACK_STATUS = 'fallbackStatus';
export function useOpenBlank(targetUrl: string, fallbackStatus?: string) {
  const subWindow: Window | null = window.open(targetUrl, '_blank');
  if (subWindow) {
    // 防止opener被利用进行攻击
    subWindow.opener = null;
    subWindow.sourceUrl = window.location.href.replace(window.location.origin, '');
    subWindow.targetUrl = targetUrl;
    subWindow.sessionStorage.setItem(SOURCE_URL, window.location.href.replace(window.location.origin, ''));
    subWindow.sessionStorage.setItem(TARGET_URL, targetUrl);
    fallbackStatus
      && subWindow.sessionStorage.setItem(
        FALLBACK_STATUS,
        `${window.btoa(
          encodeURIComponent(window.location.href.replace(window.location.origin, ''))
        )}&&${fallbackStatus}`,
      );
  }
  return {
    subWindow,
  };
}

export function useGoBack() {
  if (window.sourceUrl && window.location.href.replace(window.location.origin, '') === window.targetUrl) {
    sessionStorage.removeItem(SOURCE_URL);
    sessionStorage.removeItem(TARGET_URL);
    window.location.replace(window.sourceUrl);
    window.sourceUrl = '';
    window.targetUrl = '';
  } else {
    const sourceUrl = sessionStorage.getItem(SOURCE_URL);
    const targetUrl = sessionStorage.getItem(TARGET_URL);
    if (sourceUrl && window.location.href.replace(window.location.origin, '') === targetUrl) {
      sessionStorage.removeItem(SOURCE_URL);
      sessionStorage.removeItem(TARGET_URL);
      window.location.replace(sourceUrl);
    } else {
      window.history.back();
    }
  }
}

export function useGetFallbackStatus() {
  const fallbackStatus = sessionStorage.getItem(FALLBACK_STATUS);
  const fallbackStatusList = fallbackStatus?.split('&&') || [];
  sessionStorage.removeItem(FALLBACK_STATUS);
  if (
    fallbackStatusList.length
    && window.location.href
      .replace(window.location.origin, '') === decodeURIComponent(window.atob(fallbackStatusList[0]))
  ) {
    return fallbackStatusList[1] || '';
  }
  return '';
}

export function modifyStorageTargetUrl(newTargetUrl: string) {
  window.targetUrl = newTargetUrl;
  sessionStorage.setItem(TARGET_URL, newTargetUrl);
}
