import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

let scriptLoaded = false;
const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

function loadRecaptchaScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  
  if (!siteKey) {
    console.warn('reCAPTCHA site key not configured');
    return Promise.resolve();
  }
  
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      scriptLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));
    document.head.appendChild(script);
  });
}

export function useRecaptcha() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRecaptchaScript()
      .then(() => {
        if (window.grecaptcha && siteKey) {
          window.grecaptcha.ready(() => {
            setIsReady(true);
          });
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const executeRecaptcha = useCallback(async (action: string): Promise<string | null> => {
    if (!isReady || !siteKey) {
      console.warn('reCAPTCHA not ready or not configured');
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(siteKey, { action });
      return token;
    } catch (err) {
      console.error('reCAPTCHA execution failed:', err);
      return null;
    }
  }, [isReady]);

  return { isReady, error, executeRecaptcha };
}
