import { Button, Select, Space, Image, Skeleton, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Fragment, useEffect, useState } from "react";
import MyTable from "../MyTable/MyTable";
import styles from "./ClassificationViewer.module.css";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";

const columns = [
  { title: "Name", dataIndex: "name" },
  {
    title: "Confidence",
    dataIndex: "confidence",
    sortable: true,
    config: {
      defaultSortOrder: "descend",
      render: (text) => (text ? text : "-"),
    },
  },
];

const ClassificationViewer = (props) => {
  const img = props.data && props.data.image;
  const results = props.data && props.data.result;

  const [editable, setEditable] = useState(props.edit);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const [note, setNote] = useState("");

  // defaultLogits is used to generate new logits
  const [defaultLogits, setDefaultLogits] = useState([]);
  const [logits, setLogits] = useState([]);

  useEffect(() => {
    if (!img) return;
    const newLogits = img.project_predclasses.map((pred) => ({
      key: pred,
      name: pred,
      confidence: 0.0,
    }));
    setDefaultLogits(newLogits);
    setLogits(newLogits);
  }, [img]);

  const router = useRouter();

  const verify = () => {
    setLoading(true);
    axios.post(`/api/images/${img.id}/verify_image/`, {
      actual_class: selectedRowKeys,
      note: note,
    });
    message.success("Succesfully verify image");
    router.push("/history");
  };
  const selectPipeline = (i) => {
    const newData = JSON.parse(results[i].predicted_class);
    for (let key of Object.keys(newData)) {
      newData[key] = {
        key: key,
        name: key,
        confidence: Number.parseFloat(newData[key]),
      };
    }
    setLogits([...defaultLogits, ...Object.values(newData)]);
  };

  return (
    <Fragment>
      {img ? (
        <Space style={{ padding: "10px" }} size="large">
          <div className={styles.Preview}>
            <Space>
              <Image
                key="img"
                src={`${axios.defaults.baseURL}${img.data16}`}
                style={{ width: "20vw", height: "auto" }}
              />
              <Image
                key="gradcam"
                src={`${axios.defaults.baseURL}${img.data16}`}
                style={{ width: "20vw", height: "auto" }}
              />
            </Space>
            <h2>{img.name}</h2>
          </div>
          <Space direction="vertical">
            <Space direction="vertical" size="large">
              <Select
                style={{ width: "240px" }}
                defaultOpen
                onChange={(value) => selectPipeline(value)}
              >
                {results.map((result, i) => (
                  <Select.Option value={i} key={i}>
                    {result.pipeline_name}
                  </Select.Option>
                ))}
              </Select>
              <MyTable
                columns={columns}
                data={logits}
                config={{
                  pagination: { pageSize: 3 },
                }}
                defaultSelection={img.actualClass}
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
                  onClick={verify.bind(this)}
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
