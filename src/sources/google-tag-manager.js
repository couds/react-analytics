import { useEffect } from 'react';

const useGoogleTagManager = (gtag, addTracker) => {
  useEffect(() => {
    if (!gtag) {
      return () => {};
    }
    window.dataLayer = window.dataLayer || [];

    const trackEvent = (event, props) => {
      window.dataLayer.push({
        ...props,
        event,
      });
    };

    const trackPage = (props) => {
      trackEvent('pageView', props);
    };

    addTracker('google', {
      trackEvent,
      trackPage,
    });

    trackEvent('gtm.js', {
      'gtm.start': new Date().getTime(),
    });

    trackPage();

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
