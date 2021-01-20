import React, { Fragment, useState } from "react";
import { Button, Checkbox, Space, Table } from "antd";
// import styles from "./edit.module.css";
import { SaveOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../components/ClassificationViewer/ClassificationViewer";
import TextArea from "antd/lib/input/TextArea";
import MyTable from "../../components/MyTable/MyTable";
import { useRouter } from "next/router";



const Edit = () => {
  //For testing
  const confidence = { Normal: 0.0195, Pnuemonia: 0.0482, "COVID-19": 0.9323 };
  const confidence_array = Object.keys(confidence).map((key, i) => ({
    key: i,
    name: key,
    confidence: confidence[key],
  }));

  const router = useRouter()

  return (
    <ClassificationViewer
      src={[
        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg",
      ]}
      path="/path/to/image"
      data={confidence_array}
      edit={router.query.edit}
    />
  );
};

export default Edit;
