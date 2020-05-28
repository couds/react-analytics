import { useEffect } from 'react';

const useCrisp = (crips, addTracker) => {
  useEffect(() => {
    if (!crips) {
      return;
    }
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = crips;
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.async = 1;
    script.src = 'https://client.crisp.chat/l.js';
    head.appendChild(script);
    addTracker('crisp', {
      identify: (userId, props) => {
        if (props.email) {
          window.$crisp.push(['set', 'user:email', props.email]);
        }
      },
      eventTracker: (event, props = {}) => {
        window.$crisp.push(['set', 'session:event', [[[event, props]]]]);
      },
    });
  }, [crips]);
};

export default useCrisp;
