import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  const [images, setImages] = useState([]);
  const [tick, setTick] = useState(false);

  const reload = async () => {
    setImages(
      (
        await axios.get(`/api/project/${project.id}/list_image/`)
      ).data.images.map((image) => ({
        ...image,
        key: image.id,
        timestamp: new Date(image.timestamp),
      }))
    );
  };

  useEffect(async () => {
    if (project) {
      reload();
      setTimeout(() => {
        setTick((tick) => !tick);
      }, 5000);
    }
  }, [project, tick]);

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
