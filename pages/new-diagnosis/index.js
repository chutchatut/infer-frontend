import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./newDiagnosis.module.css";
import Upload from '../../components/Upload/Upload'

const { TabPane } = Tabs;

const newDiagnosis = () => {
  return (
    <div className={styles.Layout}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Upload files" key="1">
          <Upload />
        </TabPane>
        <TabPane tab="Select from remote files" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default newDiagnosis;
