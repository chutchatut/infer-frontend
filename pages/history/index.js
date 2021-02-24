import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  const [images, setImages] = useState([]);
  const [tick, setTick] = useState(false);

  useEffect(async () => {
    if (project) {
      setImages(
        (
          await axios.get(`/api/project/${project.id}/list_image/`)
        ).data.images.map((image) => ({
          ...image,
          timestamp: new Date(image.timestamp),
        }))
      );
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
      <HistoryTable data={images} />
    </>
  );
};

export default History;
