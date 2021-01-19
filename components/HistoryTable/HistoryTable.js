import React, { Fragment, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Table, Tag, Space, Popconfirm, Input, Button } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import MyTable from "../MyTable/MyTable";

const statuses = [
  {
    text: "In progress",
    value: "in_progress",
    color: "red",
  },
  {
    text: "AI-Annotated",
    value: "ai_annotated",
    color: "yellow",
  },
  {
    text: "Verified",
    value: "verified",
    color: "green",
  },
];

const HistoryTable = (props) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      config: {
        filter: (value, record) => record.status === value,
        sorter: (a, b) =>
          statuses.findIndex((el) => el.value === a.status) -
          statuses.findIndex((el) => el.value === b.status),
        sortDirections: ["ascend", "descend"],
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
      title: "Patient's HN",
      dataIndex: "HN",
      searchable: true,
      sortable: true,
    },
    {
      title: "Patient's age",
      dataIndex: "age",
      sortable: true,
    },
    {
      title: "Action",
      key: "action",
      config: {
        render: (text, record) => (
          <Space size="middle">
            <Link href={`view?id=${record.key}`}>
              <a>
                <EyeOutlined />
              </a>
            </Link>
            <Link href={`edit?id=${record.key}`}>
              <a>
                <EditOutlined />
              </a>
            </Link>
            <Popconfirm
              placement="top"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              title={"Are you sure to delete this image?"}
              onConfirm={props.onDeleteImage.bind(this, record.key)}
              okText="Yes"
              cancelText="No"
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
        dataSource: props.data,
        pagination: { pageSize: 50 },
        scroll: { x: 300, y: 300 },
      }}
      columns={columns}
    />
  );
};

export default HistoryTable;
