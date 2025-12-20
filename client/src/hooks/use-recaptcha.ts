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
const MAX_WAIT_TIME = 5000; // 5 seconds max wait

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteKey) {
      setError('reCAPTCHA site key not configured');
      setLoadFailed(true);
      return;
    }

    const startTime = Date.now();
    
    const checkRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          setIsReady(true);
        });
      } else if (Date.now() - startTime > MAX_WAIT_TIME) {
        // Script failed to load after timeout
        console.warn('reCAPTCHA script failed to load after timeout');
        setLoadFailed(true);
        setError('Security script could not load');
      } else {
        // Retry after a short delay
        setTimeout(checkRecaptcha, 200);
      }
    };

    checkRecaptcha();
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (loadFailed) {
      // Return special marker to indicate load failure
      return 'LOAD_FAILED';
    }
    
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
  }, [isReady, loadFailed]);

  return { isReady: isReady || loadFailed, error, executeRecaptcha, loadFailed };
}
