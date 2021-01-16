import React, { Fragment, useState } from "react";
import { Button, Checkbox, Space, Table } from "antd";
import styles from "./edit.module.css";
import { SaveOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../hoc/ClassificationViewer/ClassificationViewer";
import TextArea from "antd/lib/input/TextArea";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.confidence - b.confidence,
  },
];

// TODO add note

const Edit = () => {
  //For testing
  const confidence = { Normal: 0.0195, Pnuemonia: 0.0482, "COVID-19": 0.9323 };
  const confidence_array = Object.keys(confidence).map((key, i) => ({
    key: i,
    name: key,
    confidence: confidence[key],
  }));

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys) => {
    console.log(
      `SelectedRowKeys changed: ${selectedRowKeys.map(
        (key) => Object.keys(confidence)[key]
      )}`
    );
    setSelectedRowKeys(selectedRowKeys);
  };

  const [note, setNote] = useState("");

  //For testing
  const [loading, setLoading] = useState(false);

  return (
    <ClassificationViewer
      src={[
        "https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg",
      ]}
      path="/path/to/image"
    >
      <Table
        columns={columns}
        dataSource={confidence_array}
        rowSelection={{
          //               type: "radio",
          selectedRowKeys,
          onChange: onSelectChange,
        }}
      />
      <Space direction="vertical">
        <TextArea
          placeholder="Note"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <Button
          icon={<SaveOutlined />}
          onClick={() => setLoading(true)}
          type="primary"
          loading={loading}
          disabled={selectedRowKeys.length === 0}
        >
          Save
        </Button>
      </Space>
    </ClassificationViewer>
  );
};

export default Edit;
