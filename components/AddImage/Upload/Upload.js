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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ImgUpload from "./ImgUpload/ImgUpload";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

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
      const uploadStatus = [];
      for (let image of values.images) {
        const formData = new FormData();
        formData.append("dicom", image.originFileObj);
        try {
          response = await axios.post(
            `/api/project/${project.id}/upload_dicom/`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          uploadStatus.push({
            filename: image.name,
            key: image.name,
            status: "Success",
          });
        } catch (err) {
          uploadStatus.push({
            filename: image.name,
            key: image.name,
            status: "Failed",
          });
          // if (err.response && err.response.data && err.response.data.message)
          //   message.error(err.response.data.message);
          // else message.error("Cannot upload");
        }
        setLoading(false);
      }
      return;
    }
    try {
      if (filetype === "zip") {
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
          `/api/project/${project.id}/upload_image3D/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
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
      message.success("Upload successful");

      form.resetFields([
        "images",
        "patient_name",
        "patient_HN",
        "clinician_name",
        "patient_age",
        "scan_date",
      ]);
    } catch (err) {
      // if (e.response.status === 400) message.error(`File already exists`);
      // else message.error(`Error uploading file`);
      if (err.response && err.response.data && err.response.data.message)
        message.error(err.response.data.message);
      else message.error("Cannot upload");
    }
    setLoading(false);
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.filetype) {
      setFiletype(changedValues.filetype);
      form.resetFields(["images"]);
    }
  };

  useEffect(() => {
    setFiletype(null);
    form.resetFields();
  }, [project && project.task]);

  return (
    <Form
      {...layout}
      style={{ width: "500px", padding: "0px", marginTop: "15px" }}
      form={form}
      onFinish={onFinish}
      onValuesChange={onValuesChange}
      autoComplete="off"
    >
      <Form.Item
        name="filetype"
        label="Filetype"
        rules={[{ required: true, message: "Missing filetype" }]}
      >
        {project &&
          (project.task.indexOf("2D") != -1 ? (
            <Select>
              <Select.Option value="dcm">Dicom</Select.Option>
              <Select.Option value="png">PNG</Select.Option>
            </Select>
          ) : (
            <Select>
              <Select.Option value="zip">Zip</Select.Option>
            </Select>
          ))}
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
      {(filetype === "png" || filetype === "zip") && (
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
            rules={[
              {
                required: true,
                message: "Please input valid patient's age",
              },
            ]}
          >
            <InputNumber min={0} max={200} />
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
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Upload;
