"use client";

import { Loading } from "@/components";
import { MainPage } from "@/pageComponents";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleFadeStart = () => {
    setAnimationStarted(true);
  };

  return (
    <div className={styles.page}>
      <MainPage isLoaded={animationStarted} />
      {isLoading && <Loading onLoadingComplete={handleLoadingComplete} onFadeStart={handleFadeStart} />}
    </div>
  );
}
