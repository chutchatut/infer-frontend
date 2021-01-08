import styles from "./Loading.module.css";
import React, { useEffect } from "react";

const Loading = (props) => {
  return (
    <div className={styles.Spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loading;
