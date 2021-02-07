import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
// import styles from "./edit.module.css";
import ClassificationViewer from "../../components/ClassificationViewer/ClassificationViewer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SegmentationEditor from "../../components/SegmentationEditor/SegmentationEditor";
import axios from "axios";

// TODO add more task type

const Edit = () => {
  // const project = useSelector((state) => state.project.currentProject);

  const router = useRouter();

  const [img, setImg] = useState(null);
  useEffect(async () => {
    const img = (await axios.get(`/api/image/${router.query.id}`)).data;
    setImg({
      ...img,
      image: { ...img.image, timestamp: new Date(img.image.timestamp) },
    });
  }, [router.query.id]);

  const task_type = img && img.image.project_task;
  if (!task_type) return <Skeleton />;
  switch (task_type.toLowerCase()) {
    case "2d classification":
      return <ClassificationViewer data={img} edit={router.query.edit} />;
    case "2d segmentation":
      return <SegmentationEditor />;
    default:
      return <p>Unsupported task type</p>;
  }
};

export default Edit;
