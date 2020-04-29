import { useEffect } from 'react';

const useFullstory = (fullstory, addTracker) => {
  useEffect(() => {
    if (!fullstory) {
      return;
    }
    window._fs_debug = false;
    window._fs_host = 'fullstory.com';
    window._fs_script = 'edge.fullstory.com/s/fs.js';
    window._fs_org = fullstory;
    window._fs_namespace = 'FS';

    window.FS = (a, b, s) => {
      if (window.FS.q) {
        window.FS.q.push([a, b, s]);
        return;
      }
      window.FS._api(a, b, s);
    };
    window.FS.q = [];
    const script = document.createElement('script');
    if (!document.querySelector('script#fullstory-script')) {
      script.async = 1;
      script.id = 'fullstory-script';
      script.crossOrigin = 'anonymous';
      script.src = `https://edge.fullstory.com/s/fs.js`;
      const head = document.querySelector('head');
      head.append(script);
    }

    window.FS.identify = (i, v, s) => {
      window.FS('user', { uid: i }, s);
      if (v) window.FS('user', v, s);
    };

    window.FS.setUserVars = (v, s) => {
      window.FS('user', v, s);
    };
    window.FS.event = (i, v, s) => {
      window.FS('event', { n: i, p: v }, s);
    };
    window.FS.anonymize = () => {
      window.FS.identify(false);
    };
    window.FS.shutdown = () => {
      window.FS('rec', false);
    };
    window.FS.restart = () => {
      window.FS('rec', true);
    };
    window.FS.log = (a, b) => {
      window.FS('log', [a, b]);
    };
    window.FS.consent = (a) => {
      window.FS('consent', a);
    };
    window.FS.identifyAccount = (acctId, v) => {
      window.FS('account', { ...v, acctId });
    };
    window.FS.clearUserCookie = () => {};

    window.FS._w = {};
    window.FS._w.XMLHttpRequest = window.XMLHttpRequest;
    window.FS._w.fetch = window.fetch;

    addTracker('fullstory', {
      identify: (userId, props) => {
        window.FS.identify(userId, props);
      },
    });

    if (window.fetch)
      window.fetch = function fetch(...args) {
        return window.FS._w.fetch.apply(this, ...args);
      };
    window.FS._v = '1.2.0';
  }, [fullstory]);
};

export default useFullstory;
