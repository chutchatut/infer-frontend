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
import axios from "axios";

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

const sortableConfig = (fieldName) => ({
  sorter: (a, b) => a[fieldName] < b[fieldName],
  sortDirections: ["descend", "ascend"],
});

const { Column } = Table;

const HistoryTable = (props) => {
  // Use to highlight the input
  let searchRef = {};

  // Use to highlight search matches
  const [searchTexts, setSearchTexts] = useState({});
  const setSearchTextsWField = (fieldName, value) => {
    console.log(fieldName, value);
    const newSearchTexts = { ...searchTexts };
    newSearchTexts[fieldName] = value;
    setSearchTexts(newSearchTexts);
  };

  const searchableConfig = (fieldName) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(ref) => (searchRef[fieldName] = ref)}
          value={selectedKeys}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => {
            confirm();
            setSearchTextsWField(fieldName, selectedKeys[0]);
          }}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
              setSearchTextsWField(fieldName, selectedKeys[0]);
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              setSearchTextsWField(fieldName, "");
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[fieldName]
        ? record[fieldName]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchRef[fieldName].select(), 100);
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchTexts[fieldName]]}
        autoEscape
        textToHighlight={text}
      />
    ),
  });

  return (
    <Table
      dataSource={props.data}
      pagination={{ pageSize: 50 }}
      scroll={{ x: 300, y: 300 }}
    >
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        filters={statuses}
        onFilter={(value, record) => record.status === value}
        sorter={(a, b) =>
          statuses.findIndex((el) => el.value === a.status) -
          statuses.findIndex((el) => el.value === b.status)
        }
        sortDirections={["ascend", "descend"]}
        render={(text) => {
          const status_style = statuses.find((el) => el.value === text);
          return (
            <Fragment>
              <span style={{ color: status_style.color }}>● </span>
              {status_style.text}
            </Fragment>
          );
        }}
        fixed="left"
      />
      <Column
        title="Filename"
        dataIndex="filename"
        key="filename"
        {...sortableConfig("filename")}
        {...searchableConfig("filename")}
      />
      <Column
        title="Patient's name"
        dataIndex="patient_name"
        key="patient_name"
        {...sortableConfig("patient_name")}
        {...searchableConfig("patient_name")}
      />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
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
        )}
        fixed="right"
      />
    </Table>
  );
};

export default HistoryTable;
