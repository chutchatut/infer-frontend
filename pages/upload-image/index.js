import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./uploadImage.module.css";
import Upload from "../../components/Upload/Upload";
import Head from "next/head";
import ImageAddTable from "../../components/ImageAddTable/ImageAddTable";

const { TabPane } = Tabs;

const uploadImage = () => {
  return (
    <>
      <Head>
        <title>Upload Image</title>
      </Head>
      {/* <div className={styles.Layout}> */}
      <Tabs defaultActiveKey="1">
        <TabPane tab="Upload files" key="1">
          <Upload />
        </TabPane>
        <TabPane tab="Select from remote files" key="2">
          <ImageAddTable />
        </TabPane>
      </Tabs>
      {/* </div> */}
    </>
  );
};

export default uploadImage;
