import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { Button, Checkbox, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../hoc/ClassificationViewer/ClassificationViewer";
import MyTable from "../../components/MyTable/MyTable";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    sortable: true,
    config: {
      defaultSortOrder: "descend",
    },
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
      path="/path/to/image"
    >
      <MyTable columns={columns} data={confidence_array} />
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
