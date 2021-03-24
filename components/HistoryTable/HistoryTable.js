import React, { Fragment } from "react";
import { Space, Popconfirm, Popover, message } from "antd";
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
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Preview from "./Preview/Preview";
import Download from "./Download/Download";
// TODO add owner, copy, timestamp
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

// add logic to allow file download and upload

const HistoryTable = (props) => {
  const router = useRouter();
  const currentProject = useSelector((state) => state.project.currentProject);
  const task_type =
    currentProject && currentProject.task.toLowerCase().replace(" ", "_");

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
      dataIndex: "timestamp",
      config: {
        render: (text) => text.toUTCString(),
      },
      sortable: true,
    },
    {
      title: "Action",
      key: "action",
      config: {
        render: (text, record) => {
          return (
            <Space size="middle">
              <Preview
                url={`${axios.defaults.baseURL}${record.data16}`}
                enable={task_type.indexOf("2d") !== -1}
              >
                {task_type.indexOf("classification") !== -1 ? (
                  <a>
                    <EyeOutlined
                      onClick={router.push.bind(this, `viewer?id=${record.id}`)}
                    />
                  </a>
                ) : (
                  <a>
                    <Download>
                      <DownloadOutlined />
                    </Download>
                  </a>
                )}
              </Preview>
              {task_type.indexOf("classification") !== -1 ? (
                <Link href={`viewer?id=${record.id}&edit=true`} key="edit">
                  <a>
                    <EditOutlined />
                  </a>
                </Link>
              ) : (
                <a>
                  <UploadOutlined />
                </a>
              )}
              <Popconfirm
                placement="top"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                title={"Are you sure to delete this image?"}
                onConfirm={async () => {
                  await axios.delete(`/api/image/${record.id}/`);
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
    <MyTable
      data={props.data}
      config={{
        pagination: false,
        scroll: { x: 1000, y: "calc(100vh - 220px)" },
      }}
      columns={columns}
    />
  );
};

export default HistoryTable;
