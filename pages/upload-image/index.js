import React from "react";
import Head from "next/head";
import AddImage from "../../components/AddImage/AddImage";

const uploadImage = () => {
  return (
    <>
      <Head>
        <title>Upload Image</title>
      </Head>
      <AddImage />
    </>
  );
};

export default uploadImage;
