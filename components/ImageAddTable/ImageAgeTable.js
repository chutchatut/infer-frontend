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

const sortableConfig = (fieldName) => ({
  sorter: (a, b) => {
    console.log(typeof a[fieldName]);
    if (typeof a[fieldName] === "string")
      return a[fieldName].localeCompare(b[fieldName]);
    if (typeof a[fieldName] === "number") return a[fieldName] - b[fieldName];
  },
  sortDirections: ["descend", "ascend"],
});

const { Column } = Table;

const ImageAddTable = (props) => {
  // Use to highlight the input
  let searchRef = {};

  const [data, setData] = useState([
    { filename: "test", key: 1 },
    { filename: "test2", key: 2 },
    { filename: "test3", key: 3 },
    { filename: "test4", key: 4 },
  ]);

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
        title="Filename"
        dataIndex="filename"
        key="filename"
        {...sortableConfig("filename")}
        {...searchableConfig("filename")}
      />
    </Table>
  );
};

export default ImageAddTable;
