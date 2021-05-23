import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Popover, Space, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";

const upload = async (file, record_id, task_type, note) => {
  const formData = new FormData();
  formData.append("actual_mask", file);
  formData.append("note", note);
  try {
    if (task_type === "2d_segmentation")
      await axios.put(`/api/image/${record_id}/verify_mask/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    if (task_type === "3d_segmentation")
      await axios.put(`/api/image3D/${record_id}/verify_mask/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    message.success("Upload successful");
  } catch {
    message.error("Upload failed");
  }
};

const MyUpload = (props) => {
  const [note, setNote] = useState("");

  return (
    <Popover
      content={
        <Space direction="vertical">
          <TextArea
            placeholder="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Upload
            accept=".seg.nrrd"
            beforeUpload={(file) => {
              upload(file, props.record_id, props.task_type, note);
              return false;
            }}
            // onStart={(e) => {
            //   console.log(e);
            // }}
            // action={
            //   props.task_type === "2d_segmentation"
            //     ? `/api/image/${props.record_id}/verify_mask/`
            //     : props.task_type === "3d_segmentation"
            //     ? `/api/image3D/${props.record_id}/verify_mask/`
            //     : null
            // }
            fileList={[]}
          >
            <Button type="primary">
              <UploadOutlined /> Upload
            </Button>
          </Upload>
        </Space>
      }
      trigger="click"
    >
      <a>
        <UploadOutlined />
      </a>
    </Popover>
  );
};

export default MyUpload;
