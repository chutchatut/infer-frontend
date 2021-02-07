import { message } from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  const [images, setImages] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    if (project)
      setImages(
        (
          await axios.get(`/api/project/${project.id}/list_image/`)
        ).data.images.map((image) => ({
          ...image,
          timestamp: new Date(image.timestamp),
        }))
      );
  }, [project]);

  return (
    <>
      <Head>
        <title>View history</title>
      </Head>
      <HistoryTable
        data={images}
      />
    </>
  );
};

export default History;
