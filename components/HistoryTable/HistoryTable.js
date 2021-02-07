import React, { Fragment } from "react";
import { Space, Popconfirm, Popover } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MyTable from "../MyTable/MyTable";
import axios from "axios";
// TODO add original image
// TODO add image's owner and last update datetimestamp
// TODO copy button
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
        render: (text, record) => (
          <Space size="middle">
            <Link href={`viewer?id=${record.id}`} key="view">
              <Popover
                placement="left"
                content={
                  <img
                    src={`${axios.defaults.baseURL}${record.data16}`}
                    width="200"
                  />
                }
              >
                <a>
                  <EyeOutlined />
                </a>
              </Popover>
            </Link>
            <Link href={`viewer?id=${record.id}&edit=true`} key="edit">
              <a>
                <EditOutlined />
              </a>
            </Link>
            <Popconfirm
              placement="top"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              title={"Are you sure to delete this image?"}
              onConfirm={props.onDeleteImage.bind(this, record.id)}
              okText="Yes"
              cancelText="No"
              key="delete"
            >
              <a>
                <DeleteOutlined />
              </a>
            </Popconfirm>
          </Space>
        ),
        fixed: "right",
      },
    },
  ];

  return (
    <MyTable
      data={props.data}
      config={{
        pagination: { pageSize: 50 },
        scroll: { x: 1000, y: 300 },
      }}
      columns={columns}
    />
  );
};

export default HistoryTable;
