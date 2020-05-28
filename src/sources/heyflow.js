import { useEffect } from 'react';

const useHeyflow = (heyflow) => {
  useEffect(() => {
    if (!heyflow) {
      return;
    }
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.async = 1;
    script.src = `https://app.heyflow.co/pixel/${heyflow}`;
    head.appendChild(script);
  }, [heyflow]);
};

export default useHeyflow;
