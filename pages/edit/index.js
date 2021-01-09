import React, { Fragment, useState } from "react";
import { Button, Checkbox, Table } from "antd";
import styles from "./edit.module.css";
import { SaveOutlined } from "@ant-design/icons";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.confidence - b.confidence,
  },
];

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

  //For testing
  const [loading, setLoading] = useState(false);
  const imgPath = "/path/to/image.dicom";

  return (
    <Fragment>
      <div className={styles.Layout}>
        <div className={styles.Preview}>
          <img src="https://www.hdwallpaper.nu/wp-content/uploads/2015/02/Funny-Cat-Hidden.jpg" />
          <p>
            <h2>{imgPath}</h2>
          </p>
        </div>
        <div className={styles.Pred}>
          <Table
            columns={columns}
            dataSource={confidence_array}
            rowSelection={{
              type: "radio",
              selectedRowKeys,
              onChange: onSelectChange,
            }}
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
        </div>
      </div>
    </Fragment>
  );
};

export default Edit;
