import { Tabs } from "antd";
import React from "react";
import Upload from "./Upload/Upload";
import ImageAddTable from "./ImageAddTable/ImageAddTable";

const { TabPane } = Tabs;

const AddImage = () => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Upload files" key="1">
        <Upload />
      </TabPane>
      <TabPane tab="Select from remote files" key="2">
        <ImageAddTable />
      </TabPane>
    </Tabs>
  );
};

export default AddImage;
