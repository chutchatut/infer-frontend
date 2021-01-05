import styles from "./Loading.module.css";
import React, { useEffect } from "react";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
import Checkmark from "./Checkmark/Checkmark";
import { useRouter } from "next/router";

const Loading = (props) => {
  if (props.loading)
    return (
      <div className={styles.Spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  const router = useRouter();
  useEffect(() => {
    if (props.redirect_to && !props.loading) {
      setTimeout(() => router.replace(props.redirect_to), 1200);
    }
  }, [props.loading, props.redirect_to]);
  return <Checkmark />;
};

export default Loading;
