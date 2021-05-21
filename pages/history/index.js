import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  const [images, setImages] = useState([]);

  const reload = async () => {
    if (!project) return;
    try {
      setImages(
        (
          await axios.get(`/api/project/${project.id}/list_image/`)
        ).data.images.map((image) => ({
          ...image,
          key: image.id,
          timestamp: new Date(image.timestamp),
        }))
      );
    } catch (e) {}
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, []);

  return (
    <>
      <Head>
        <title>View history</title>
      </Head>
      <HistoryTable data={images} reload={reload} />
    </>
  );
};

export default History;
