import axios from "axios";
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
    filename: "0087bd3a-55a7-4045-b111-b018fa52d361.dcm",
    patient_name: "Griselda Luczki",
    predicted_class: "",
  },
  {
    key: "2",
    status: "ai_annotated",
    filename: "009eb222-eabc-4150-8121-d5a6d06b8ebf.dcm",
    patient_name: "Santos Marrone",
    predicted_class: "normal",
  },
  {
    key: "3",
    status: "ai_annotated",
    filename: "00a05408-8291-4231-886e-13763e103161.dcm",
    patient_name: "Earle Hiller",
    predicted_class: "COVID-19",
  },
  {
    key: "4",
    status: "verified",
    filename: "00aecb01-a116-45a2-956c-08d2fa55433f.dcm",
    patient_name: "Enoch Salameh",
    predicted_class: "pnuemonia",
  },
  {
    key: "5",
    status: "verified",
    filename: "01027bc3-dc40-4165-a6c3-d6be2cb7ca34.dcm",
    patient_name: "Asia Defaber",
    predicted_class: "normal",
  },
];

const History = () => {
  const project = useSelector((state) => state.project.currentProject);
  return (
    <HistoryTable
      data={data}
      onDeleteImage={(key) =>
        axios.post(`/api/project/${project.id}/remove_dicom`, {
          id: key,
        })
      }
    />
  );
};

export default History;
