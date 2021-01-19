import Head from "next/head";
import React from "react";
import styles from "./aboutUs.module.css";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About us</title>
      </Head>
      <div className={styles.Layout}>
        <p>About us</p>
      </div>
    </>
  );
};

export default AboutUs;
