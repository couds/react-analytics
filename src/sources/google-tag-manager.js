import { useEffect } from 'react';

const useGoogleTagManager = (gtag, addTracker) => {
  useEffect(() => {
    if (!gtag) {
      return () => {};
    }
    window.dataLayer = window.dataLayer || [];

    addTracker('google', (event, props) => {
      window.dataLayer.push({
        event,
        ...props,
      });
    });

    const gtagScript = document.createElement('script');
    if (!document.querySelector('script#gtag-script')) {
      gtagScript.id = 'gtag-script';
      gtagScript.src = `//www.googletagmanager.com/gtm.js?id=${gtag}`;
      gtagScript.type = 'text/javascript';
      document.head.append(gtagScript);
    }

    return () => {
      document.head.removeChild(gtagScript);
      addTracker('google', undefined);
    };
  }, [gtag]);
};

export default useGoogleTagManager;
