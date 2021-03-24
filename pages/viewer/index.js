import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
// import styles from "./edit.module.css";
import ClassificationEditor from "../../components/ClassificationEditor/ClassificationEditor";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import SegmentationEditor from "../../components/SegmentationEditor/SegmentationEditor";
import axios from "axios";

// TODO add more task type

const Viewer = () => {
  // const project = useSelector((state) => state.project.currentProject);

  const router = useRouter();

  const [img, setImg] = useState(null);
  useEffect(async () => {
    if (!router.query.id) return;
    const img = (await axios.get(`/api/image/${router.query.id}`)).data;
    setImg({
      ...img,
      image: { ...img.image, timestamp: new Date(img.image.timestamp) },
    });
  }, [router.query.id]);

  const task_type =
    img && img.image.project_task.toLowerCase().replace(" ", "_");
  if (!task_type) return <Skeleton />;
  if (task_type.indexOf("2d") !== -1)
    return (
      <ClassificationEditor
        data={img}
        edit={router.query.edit}
        task_type={task_type}
      />
    );

  return <p>Unsupported task type</p>;
};

export default Viewer;
