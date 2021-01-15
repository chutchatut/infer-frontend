import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Button, Checkbox, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../hoc/ClassificationViewer/ClassificationViewer";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.confidence - b.confidence,
  },
];

const Edit = () => {
  //For testing
  const confidence = { Normal: 0.0195, Pnuemonia: 0.0482, "COVID-19": 0.9323 };
  const confidence_array = Object.keys(confidence).map((key, i) => ({
    key: i,
    name: key,
    confidence: confidence[key],
  }));

  //For testing
  const imgPath = "/path/to/image.dicom";

  const router = useRouter();

  return (
    <ClassificationViewer
      src={[
        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg",
      ]}
      path="https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg"
    >
      <Table columns={columns} dataSource={confidence_array} />
      <Button
        icon={<EditOutlined />}
        onClick={router.push.bind(this, "edit")}
        type="primary"
      >
        Edit
      </Button>
    </ClassificationViewer>
  );
};

export default Edit;
