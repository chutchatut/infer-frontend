import React, { Fragment, useState } from "react";
import { Button, Checkbox, Space, Table } from "antd";
import styles from "./edit.module.css";
import { SaveOutlined } from "@ant-design/icons";
import ClassificationViewer from "../../hoc/ClassificationViewer/ClassificationViewer";
import TextArea from "antd/lib/input/TextArea";
import MyTable from "../../components/MyTable/MyTable";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    sortable: true,
    config: {
      defaultSortOrder: "descend",
    },
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
      <MyTable
        columns={columns}
        data={confidence_array}
        selectionType="checkbox"
        onSelectChange={onSelectChange}
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
