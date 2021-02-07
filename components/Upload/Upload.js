import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import axios from "axios";
import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import ImgUpload from "./ImgUpload/ImgUpload";

const Upload = () => {
  const [form] = Form.useForm();
  const [filetype, setFiletype] = useState(null);

  const [loading, setLoading] = useState(false);
  const project = useSelector((state) => state.project.currentProject);

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Received values of form:", values);
    let response;
    if (filetype === "dcm") {
      for (let image of values.images) {
        const formData = new FormData();
        formData.append("dicom", image.originFileObj);
        response = await axios.post(
          `/api/project/${project.id}/upload_dicom/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }
    } else if (filetype === "png") {
      const formData = new FormData();
      formData.append("image", values.images[0].originFileObj);
      formData.append("patient_name", values.patient_name);
      formData.append("patient_id", values.patient_HN);
      formData.append("physician_name", values.clinician_name);
      formData.append("patient_age", values.patient_age);
      formData.append(
        "content_date",
        values.scan_date.toISOString().slice(0, 10).replace(/-/g, "")
      );
      response = await axios.post(
        `/api/project/${project.id}/upload_image/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    }
    if (response && response.status === 200) {
      message.success("Upload successful");
      setLoading(false);
      form.resetFields();
    }
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.filetype) {
      setFiletype(changedValues.filetype);
      form.resetFields(["images"]);
    }
  };

  return (
    <Form
      style={{ width: "500px", padding: "0px" }}
      form={form}
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      autoComplete="off"
    >
      <Form.Item
        name="filetype"
        label="Filetype"
        rules={[{ required: true, message: "Missing filetype" }]}
      >
        <Select>
          <Select.Option value="dcm">Dicom</Select.Option>
          <Select.Option value="png">png</Select.Option>{" "}
        </Select>
      </Form.Item>
      {filetype && (
        <Form.Item
          name="images"
          label="Images"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Missing image" }]}
          valuePropName="fileList"
        >
          <ImgUpload filetype={filetype} />
        </Form.Item>
      )}
      {filetype === "png" && (
        <Fragment>
          <Form.Item
            label="Patient's name"
            name="patient_name"
            rules={[{ required: true, message: "Please input patient's name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Patient's HN"
            name="patient_HN"
            rules={[{ required: true, message: "Please input patient's HN" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Patient's age"
            name="patient_age"
            rules={[{ required: true, message: "Please input patient's age" }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Scan date"
            name="scan_date"
            rules={[{ required: true, message: "Please input scan data" }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Clinician's name"
            name="clinician_name"
            rules={[
              { required: true, message: "Please input clinician's name" },
            ]}
          >
            <Input />
          </Form.Item>
        </Fragment>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Upload;
