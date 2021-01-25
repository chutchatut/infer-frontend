import React from "react";
import Head from "next/head";
import InferSelector from "../../components/InferSelector/InferSelector";


// TODO pipeline as radio box
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
