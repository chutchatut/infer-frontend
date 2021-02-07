import { Button, Select, Space, Image, Skeleton } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Fragment, useEffect, useState } from "react";
import MyTable from "../MyTable/MyTable";
import styles from "./ClassificationViewer.module.css";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";

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
// TODO get image's project and check if it's equal. If not change the project

const ClassificationViewer = (props) => {
  console.log(props.data);
  const img = props.data && props.data.image;

  const [editable, setEditable] = useState(props.edit);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(false);

  const [note, setNode] = useState("");

  const [logits, setLogits] = useState([]);
  useEffect(() => {
    if (img)
      setLogits(
        img.project_predclasses.map((pred) => ({ name: pred, confidence: "-" }))
      );
  }, [img]);

  return (
    <Fragment>
      {img ? (
        <Space style={{ padding: "10px" }} size="large">
          <div className={styles.Preview}>
            <Space>
              <Image
                src={`${axios.defaults.baseURL}${img.data16}`}
                style={{ width: "20vw", height: "auto" }}
              />
              <Image
                src={`${axios.defaults.baseURL}${img.data16}`}
                style={{ width: "20vw", height: "auto" }}
              />
            </Space>
            <h2>{img.name}</h2>
          </div>
          <Space direction="vertical">
            <Space direction="vertical" size="large">
              <Select style={{ width: "240px" }} defaultOpen>
                <Select.Option>COVID-19 + Pnuemonia V1</Select.Option>
              </Select>
              <MyTable
                columns={columns}
                data={logits}
                // defaultSelection={["COVID-19"]}
                selectionType="checkbox"
                onSelectChange={setSelectedRowKeys}
                disableRowSelection={!editable}
              />
            </Space>
            <Space direction="vertical">
              <TextArea
                placeholder="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                disabled={!editable}
              />
              <span>
                Last edited {img.timestamp.toUTCString().replace("GMT", "")}{" "}
                <br />
                {img.verify_by && `Edited by ${img.verify_by}`}
              </span>
              {editable ? (
                <Button
                  icon={<SaveOutlined />}
                  onClick={() => setLoading(true)}
                  type="primary"
                  loading={loading}
                  disabled={selectedRowKeys.length === 0}
                >
                  Save
                </Button>
              ) : (
                <Button
                  icon={<EditOutlined />}
                  type="primary"
                  onClick={setEditable.bind(this, true)}
                >
                  Edit
                </Button>
              )}
            </Space>
          </Space>
        </Space>
      ) : (
        <Skeleton />
      )}
    </Fragment>
  );
};

export default ClassificationViewer;
