import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import React, { Fragment, useState } from "react";
import ImgUpload from "./ImgUpload/ImgUpload";

const Upload = () => {
  const [form] = Form.useForm();
  const [filetype, setFiletype] = useState(null);

  const onFinish = async (values) => {
    console.log("Received values of form:", values);

    if (filetype === "dcm") {
      for (let image of values.images) {
        const formData = new FormData();
        formData.append("data", image.originFileObj);
        axios.post("/api/image/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    } else if (filetype === "png") {
      // TODO implement this later
    }
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.filetype) {
      setFiletype(changedValues.filetype);
      form.resetFields(["images"]);
    }
  };

  return (
    <div style={{ width: "500px", paddingTop: "20px" }}>
      <Form
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
            getValueFromEvent={(nextTargetKeys) => nextTargetKeys}
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
              rules={[
                { required: true, message: "Please input patient's name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Patient's HN"
              name="patient_HN"
              rules={[{ required: true, message: "Please input patient's HN" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Patient's age"
              name="patient_age"
              rules={[
                { required: true, message: "Please input patient's age" },
              ]}
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Upload;
