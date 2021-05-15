import { EditOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, message, Select, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MyTable from "../../MyTable/MyTable";

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

const Editor = (props) => {
  const gradcamColumn = [
    {
      title: "Gradcam",
      dataIndex: "gradcam",
      config: {
        render: (text) =>
          text && <EyeOutlined onClick={props.setGradcam.bind(this, text)} />,
      },
    },
  ];

  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    props.img.actual_class ? props.img.actual_class : []
  );
  const [editable, setEditable] = useState(props.edit);
  const [note, setNote] = useState(props.img.note);

  const router = useRouter();

  const verify = async () => {
    setLoading(true);
    if (props.task_type === "2d_classification")
      await axios.put(`/api/image/${props.img.id}/verify_image/`, {
        actual_class: selectedRowKeys,
        note: note,
      });
    if (props.task_type === "3d_classification")
      await axios.put(`/api/image3D/${props.img.id}/verify_image/`, {
        actual_class: selectedRowKeys,
        note: note,
      });
    setLoading(false);
    message.success("Succesfully verify image");
    router.push("/history");
  };

  return (
    <Space direction="vertical">
      <Space direction="vertical" size="large">
        <Select
          //   style={{ width: "240px" }}
          style={{ width: "100%" }}
          defaultOpen
          onChange={(value) => props.selectPipeline(value)}
        >
          {props.results &&
            props.results.map((result, i) => (
              <Select.Option value={i} key={i}>
                {result.pipeline_name}
              </Select.Option>
            ))}
        </Select>
        <MyTable
          columns={
            props.task_type === "2d_classification"
              ? columns.concat(gradcamColumn)
              : columns
          }
          data={props.logits}
          config={{
            pagination: false,
            scroll: {
              //  x: "400px",
              y: "300px",
            },
            // style: { width: "500px" },
            // style: { width: "300px" },
          }}
          selectionType="checkbox"
          initSelection={props.img.actual_class}
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
          Last edited {props.img.timestamp.toUTCString().replace("GMT", "")}{" "}
          <br />
          {props.img.verify_by && `Edited by ${props.img.verify_by}`}
        </span>
        {editable ? (
          <Button
            icon={<SaveOutlined />}
            onClick={verify.bind(this)}
            type="primary"
            loading={loading}
            // disabled={selectedRowKeys.length === 0}
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
  );
};

export default Editor;
