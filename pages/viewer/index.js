import React, { Fragment, useState } from "react";
import { Button, Checkbox, Space, Table } from "antd";
// import styles from "./edit.module.css";
import { SaveOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../components/ClassificationViewer/ClassificationViewer";
import TextArea from "antd/lib/input/TextArea";
import MyTable from "../../components/MyTable/MyTable";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SegmentationEditor from "../../components/SegmentationEditor/SegmentationEditor";

// TODO add more task type

const Edit = () => {
  //For testing
  const confidence = { Normal: 0.0195, Pnuemonia: 0.0482, "COVID-19": 0.9323 };
  const confidence_array = Object.keys(confidence).map((key, i) => ({
    key: i,
    name: key,
    confidence: confidence[key],
  }));

  const project = useSelector((state) => state.project.currentProject);

  const router = useRouter();

  // DO NOT replace this with switch case
  try {
    if (project.task === "2d classification")
      return (
        <ClassificationViewer
          id={router.query.id}
          path="/path/to/image"
          data={confidence_array}
          edit={router.query.edit}
        />
      );
    if (project.task === "2d segmentation") return <SegmentationEditor />;
  } catch (error) {
    console.log(error);
  }
  return <p>Unsupported Task type</p>;
};

export default Edit;
