import React, { useRef, useState } from "react";
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

const data = [
  {
    key: "1",
    status: "unverified",
    filename: "0087bd3a-55a7-4045-b111-b018fa52d361.dcm",
  },
  {
    key: "2",
    status: "unverified",
    filename: "009eb222-eabc-4150-8121-d5a6d06b8ebf.dcm",
  },
  {
    key: "3",
    status: "unverified",
    filename: "00a05408-8291-4231-886e-13763e103161.dcm",
  },
  {
    key: "4",
    status: "unverified",
    filename: "00aecb01-a116-45a2-956c-08d2fa55433f.dcm",
  },
  {
    key: "5",
    status: "verified",
    filename: "01027bc3-dc40-4165-a6c3-d6be2cb7ca34.dcm",
  },
];

const searchIcon = (filtered) => (
  <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
);

const History = () => {
  // Use to highlight the input
  let searchRef;

  // Use to highlight search matches
  const [searchText, setSearchText] = useState("");

  // Define search dropdown menu
  const searchDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(ref) => (searchRef = ref)}
        value={selectedKeys}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() => {
          confirm();
          setSearchText(selectedKeys[0]);
        }}
        style={{ width: 188, marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            confirm();
            setSearchText(selectedKeys[0]);
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
            setSearchText("");
          }}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </Space>
    </div>
  );

  return (
    <Table dataSource={data}>
      <Column
        title="Status"
        dataIndex="status"
        key="status"
        filters={[
          {
            text: "Unverified",
            value: "unverified",
          },
          {
            text: "Verified",
            value: "verified",
          },
        ]}
        onFilter={(value, record) => record.status === value}
        sorter={(a, b) => a.status.length - b.status.length}
        sortDirections={["ascend", "descend"]}
      />
      <Column
        title="Filename"
        dataIndex="filename"
        key="filename"
        sorter={(a, b) => a.filename < b.filename}
        sortDirections={["descend", "ascend"]}
        filterDropdown={searchDropdown}
        filterIcon={searchIcon}
        onFilter={(value, record) =>
          record.filename
            ? record.filename
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            : ""
        }
        onFilterDropdownVisibleChange={(visible) => {
          if (visible) {
            setTimeout(() => searchRef.select(), 100);
          }
        }}
        render={(text) => (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            // textToHighlight={text ? text.toString() : ""}
            textToHighlight={text}
          />
        )}
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
      />
    </Table>
  );
};

export default History;
