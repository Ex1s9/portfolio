"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Loading } from "@/components";
import { MainPage } from "@/widgets";

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
