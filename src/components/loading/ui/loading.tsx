'use client';

import { useEffect, useState } from 'react';
import styles from './loading.module.scss';

interface LoadingPageProps {
  onLoadingComplete?: () => void;
  onFadeStart?: () => void;
}

export const Loading = ({ onLoadingComplete, onFadeStart }: LoadingPageProps) => {
  const [showFullName, setShowFullName] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(true);
  const [showBackground, setShowBackground] = useState(true);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowFullName(false);
    }, 1000);

    const timer2 = setTimeout(() => {
      setShowPortfolio(false);
    }, 1300);

    const timer3 = setTimeout(() => {
      setShowBackground(false);
      if (onFadeStart) {
        onFadeStart();
      }
    }, 2000);

    const timer4 = setTimeout(() => {
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onLoadingComplete]);

  return (
    <div className={`${styles.loadingContainer} ${!showBackground ? styles.fadeOut : ''}`}>
      <div className={styles.textContainer}>
        <span 
          className={`${styles.text} ${styles.fullName} ${!showFullName ? styles.fadeOut : ''}`}
        >
          Roman Sadovskii
        </span>
        <span
          className={`${styles.text} ${styles.portfolio} ${!showPortfolio ? styles.fadeOut : ''}`}
        >
          Portfolio
        </span>
      </div>
    </div>
  );
}