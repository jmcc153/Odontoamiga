import React from "react";
import styles from "./loading.module.css";
export const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <div class={styles.loader}></div>
    </div>
  );
};
