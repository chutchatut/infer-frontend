import React, { Fragment, useRef, useState } from "react";
import styles from "./history.module.css";
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

const { Column } = Table;

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

const History = () => {
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
      dataSource={data}
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
              onConfirm={() => {
                //TODO add logic
                console.log(`Delete image ${record.key}`);
              }}
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

export default History;
