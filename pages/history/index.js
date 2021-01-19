import axios from "axios";
import Head from "next/head";
import React from "react";
import { useSelector } from "react-redux";
import HistoryTable from "../../components/HistoryTable/HistoryTable";

// TODO
// + Metadata (HN number, patient name, scan date, submitted date)
// Show predicted class
// Can share picture for any logged in user
// Can edit only if is owner

const data = [
  {
    key: "1",
    status: "in_progress",
    HN: "3289563",
    patient_name: "Griselda Luczki",
    age: 123,
    predicted_class: "",
  },
  {
    key: "2",
    status: "ai_annotated",
    HN: "1234563",
    patient_name: "Santos Marrone",
    age: 456,
    predicted_class: "normal",
  },
  {
    key: "3",
    status: "ai_annotated",
    HN: "4321363",
    patient_name: "Earle Hiller",
    age: 12,
    predicted_class: "COVID-19",
  },
  {
    key: "4",
    status: "verified",
    HN: "5321363",
    age: 24,
    patient_name: "Enoch Salameh",
    predicted_class: "pnuemonia",
  },
  {
    key: "5",
    status: "verified",
    HN: "1324563",
    age: 80,
    patient_name: "Asia Defaber",
    predicted_class: "normal",
  },
];

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  return (
    <>
      <Head>
        <title>View history</title>
      </Head>
      <HistoryTable
        data={data}
        onDeleteImage={(key) =>
          axios.post(`/api/project/${project.id}/remove_dicom`, {
            id: key,
          })
        }
      />
    </>
  );
};

export default History;
