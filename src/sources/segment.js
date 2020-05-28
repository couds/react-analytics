import { useEffect } from 'react';

const useSegment = (segment, addTracker) => {
  useEffect(() => {
    if (!segment) {
      return () => {};
    }

    window.analytics = window.analytics || [];
    const head = document.querySelector('head');
    const script = document.createElement('script');
    if (!document.querySelector('script#segment-script')) {
      script.id = 'segment-script';
      script.type = 'text/javascript';
      script.async = !0;
      script.src = `https://cdn.segment.com/analytics.js/v1/${segment}/analytics.min.js`;
      head.append(script);
    }
    window.analytics._loadOptions = {};

    window.analytics.invoked = true;
    window.analytics.methods = [
      'trackSubmit',
      'trackClick',
      'trackLink',
      'trackForm',
      'pageview',
      'identify',
      'reset',
      'group',
      'track',
      'ready',
      'alias',
      'debug',
      'page',
      'once',
      'off',
      'on',
    ];
    window.analytics.factory = (t) => {
      return (...args) => {
        window.analytics.push([t, ...args]);
        return window.analytics;
      };
    };
    for (let t = 0; t < window.analytics.methods.length; t += 1) {
      const e = window.analytics.methods[t];
      window.analytics[e] = window.analytics.factory(e);
    }
    window.analytics.SNIPPET_VERSION = '4.1.0';
    window.analytics.page();

    const trackEvent = (event, props) => {
      window.analytics.track(event, props);
    };

    const identify = (userId, props) => {
      window.analytics.identify(userId, props);
    };

    const trackPage = (props = {}) => {
      const { name, ...properties } = props;
      window.analytics.page(name, properties);
    };

    addTracker('segment', {
      trackEvent,
      identify,
      trackPage,
    });

    return () => {
      addTracker('segment', undefined);
      head.removeChild(script);
    };
  }, [segment]);
};

export default useSegment;
