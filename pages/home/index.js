import Head from "next/head";
import React, { useEffect, useState } from "react";
import SelectProject from "../../components/SelectProject/SelectProject";

// TODO add short desc
// TODO add classes
const Home = () => {
  return (
    <>
      <Head>
        <title>Projects dashboard</title>
      </Head>
      <SelectProject />
    </>
  );
};

export default Home;
