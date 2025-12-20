import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setError('reCAPTCHA site key not configured');
      return;
    }

    // Script is loaded via HTML, just wait for grecaptcha to be ready
    const checkRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      } else {
        // Retry after a short delay if grecaptcha isn't loaded yet
        setTimeout(checkRecaptcha, 100);
      }
    };

    checkRecaptcha();
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!isReady || !siteKey) {
      console.warn('reCAPTCHA not ready or not configured');
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (err: unknown) {
      console.error('reCAPTCHA execution failed:', err);
      return null;
    }
  }, [isReady]);

  return { isReady, error, executeRecaptcha };
}
