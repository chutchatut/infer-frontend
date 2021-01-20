import React from "react";
import Head from "next/head";
import InferSelector from "../../components/InferSelector/InferSelector";

const Upload = () => {
  return (
    <>
      <Head>
        <title>New diagnosis</title>
      </Head>
      <div style={{ minHeight: "280px", padding: "20px", background: "#fff" }}>
        <InferSelector />
      </div>
    </>
  );
};

export default Upload;
