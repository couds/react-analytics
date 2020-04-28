import { useEffect } from 'react';

const useHotjar = (hotjar) => {
  useEffect(() => {
    if (!hotjar) {
      return;
    }
    window.hj = (...args) => {
      (window.hj.q = window.hj.q || []).push(...args);
    };
    window._hjSettings = { hjid: hotjar, hjsv: 6 };
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.async = 1;
    script.src = `https://static.hotjar.com/c/hotjar-${hotjar}.js?sv=6`;
    head.appendChild(script);
  }, [hotjar]);
};

export default useHotjar;
