import { Button, Select, Space, Image, Skeleton, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Fragment, useEffect, useState } from "react";
import MyTable from "../MyTable/MyTable";
import styles from "./ClassificationViewer.module.css";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import axios from "axios";
import { useRouter } from "next/router";

const columns = [
  { title: "Name", dataIndex: "name", searchable: true, sortable: true },
  {
    title: "Confidence",
    dataIndex: "confidence",
    sortable: true,
    config: {
      defaultSortOrder: "descend",
      render: (text) => (text ? text : "-"),
    },
  },
  {
    title: "Previously selected",
    dataIndex: "selected",
    sortable: true,
    config: { render: (text) => (text ? "Yes" : "No") },
  },
];

const ClassificationViewer = (props) => {
  const img = props.data && props.data.image;
  const results = props.data && props.data.result;
  const [editable, setEditable] = useState(props.edit);

  const [selectedRowKeys, setSelectedRowKeys] = useState(
    img.actual_class ? img.actual_class : []
  );
  const [loading, setLoading] = useState(false);

  const [note, setNote] = useState(img.note);

  // defaultLogits is a dict used to generate new logits
  const [defaultLogits, setDefaultLogits] = useState({});
  const [logits, setLogits] = useState([]);

  const [gradcam, setGradcam] = useState(img.data16);

  useEffect(() => {
    if (!img) return;
    const newDefaultLogits = {};
    for (let pred of img.project_predclasses) {
      newDefaultLogits[pred] = {
        key: pred,
        name: pred,
        confidence: 0.0,
        selected: img.actual_class && img.actual_class.indexOf(pred) > -1,
      };
    }
    setDefaultLogits(newDefaultLogits);
    setLogits(Object.values(newDefaultLogits));
  }, [img]);

  const router = useRouter();

  const verify = async () => {
    setLoading(true);
    await axios.put(`/api/image/${img.id}/verify_image/`, {
      actual_class: selectedRowKeys,
      note: note,
    });
    setLoading(false);
    message.success("Succesfully verify image");
    router.push("/history");
  };

  const selectPipeline = (i) => {
    const newData = JSON.parse(results[i].predicted_class);
    const newLogits = { ...defaultLogits };
    for (let pred of Object.keys(newData)) {
      newLogits[pred] = {
        ...newLogits[pred],
        confidence: Number.parseFloat(newData[pred]),
      };
    }
    setLogits(Object.values(newLogits));
    setGradcam(results[i].gradcam);
  };

  const statuses = [
    {
      text: "Uploaded",
      color: "black",
    },
    {
      text: "In progress",
      color: "red",
    },
    {
      text: "AI-Annotated",
      color: "yellow",
    },
    {
      text: "Verified",
      color: "green",
    },
  ];

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
                src={`${axios.defaults.baseURL}${gradcam}`}
                style={{ width: "20vw", height: "auto" }}
              />
            </Space>
            <h2>{img.name}</h2>
            <Fragment>
              <span style={{ color: statuses[img.status].color }}>● </span>
              {statuses[img.status].text}
            </Fragment>
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
                  pagination: false,
                  scroll: { y: "300px" },
                  style: { width: "400px" },
                }}
                selectionType="checkbox"
                initSelection={img.actual_class}
                onSelectChange={setSelectedRowKeys}
                disableRowSelection={!editable}
              />
              <TextArea
                placeholder="Note"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                disabled={!editable}
              />
            </Space>
            <Space direction="vertical">
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
