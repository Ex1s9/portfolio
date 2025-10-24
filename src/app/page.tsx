"use client";

import { Loading } from "@/components";
import { MainPage } from "@/pageComponents";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.page}>
      <MainPage />
      {isLoading && <Loading onLoadingComplete={handleLoadingComplete} />}
    </div>
  );
}
