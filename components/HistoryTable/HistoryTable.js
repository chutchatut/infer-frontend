import React, { Fragment, useState } from "react";
import { Space, Popconfirm, message, Image } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MyTable from "../MyTable/MyTable";
import axios from "axios";
import { useSelector } from "react-redux";
import Download from "./Download/Download";
import MyUpload from "./MyUpload/MyUpload";

const statuses = [
  {
    text: "Uploaded",
    value: 0,
    color: "black",
  },
  {
    text: "In progress",
    value: 1,
    color: "red",
  },
  {
    text: "AI-Annotated",
    value: 2,
    color: "yellow",
  },
  {
    text: "Verified",
    value: 3,
    color: "green",
  },
];

const HistoryTable = (props) => {
  const currentProject = useSelector((state) => state.project.currentProject);
  const task_type =
    currentProject && currentProject.task.toLowerCase().replace(" ", "_");

  const [previewImg, setPreviewImg] = useState("");

  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      config: {
        filters: statuses,
        render: (text) => {
          const status_style = statuses.find((el) => el.value === text);
          return (
            <Fragment>
              <span style={{ color: status_style.color }}>● </span>
              {status_style.text}
            </Fragment>
          );
        },
        fixed: "left",
      },
    },
    {
      title: "Predicted Class",
      dataIndex: "predclass",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's HN",
      dataIndex: "patient_id",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's name",
      dataIndex: "patient_name",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's age",
      dataIndex: "patient_age",
      sortable: true,
    },
    {
      title: "Clinician's name",
      dataIndex: "physician_name",
      searchable: true,
      sortable: true,
    },
    {
      title: "Scan date",
      dataIndex: "content_date",
      sortable: true,
    },
    {
      title: "Action",
      key: "action",
      config: {
        render: (text, record) => {
          return (
            <Space size="middle">
              {task_type.indexOf("2d") !== -1 && (
                <a>
                  <EyeOutlined
                    onClick={setPreviewImg.bind(
                      this,
                      `${axios.defaults.baseURL}${record.data}`
                    )}
                  />
                </a>
              )}

              <a>
                <Download record={record} task_type={task_type}>
                  <DownloadOutlined />
                </Download>
              </a>

              {/* </Preview> */}
              {task_type.indexOf("classification") !== -1 ? (
                task_type.indexOf("2d") !== -1 ? (
                  <Link href={`viewer?id=${record.id}&edit=true`} key="edit">
                    <a>
                      <EditOutlined />
                    </a>
                  </Link>
                ) : (
                  <Link href={`viewer3d?id=${record.id}&edit=true`} key="edit">
                    <a>
                      <EditOutlined />
                    </a>
                  </Link>
                )
              ) : (
                <MyUpload record_id={record.id} task_type={task_type} />
              )}
              <Popconfirm
                placement="top"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                title={"Are you sure to delete this image?"}
                onConfirm={async () => {
                  if (task_type.indexOf("2d") !== -1)
                    await axios.delete(`/api/image/${record.id}/`);
                  if (task_type.indexOf("3d") !== -1)
                    await axios.delete(`/api/image3D/${record.id}/`);
                  message.success("Image has been successfully deleted");
                  props.reload();
                }}
                okText="Yes"
                cancelText="No"
                key="delete"
              >
                <a>
                  <DeleteOutlined />
                </a>
              </Popconfirm>
            </Space>
          );
        },
      },
      fixed: "right",
    },
  ];

  return (
    <>
      <MyTable
        data={props.data}
        config={{
          pagination: false,
          scroll: { x: 1000, y: "calc(100vh - 220px)" },
        }}
        columns={columns}
      />
      {previewImg && (
        <Image
          preview={{
            onVisibleChange: (visible, prevVisible) => {
              if (!visible) {
                setPreviewImg("");
              }
            },
            src: previewImg,
            visible: previewImg,
            mask: false,
          }}
        />
      )}
    </>
  );
};

export default HistoryTable;
