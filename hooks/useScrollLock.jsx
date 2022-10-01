import React from 'react';

export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarWidth}`;
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
};
