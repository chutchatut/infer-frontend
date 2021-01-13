import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import React, { Fragment, useState } from "react";
import ImgUpload from "./ImgUpload/ImgUpload";

const Upload = () => {
  const [form] = Form.useForm();
  const [filetype, setFiletype] = useState(null);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  console.log(filetype);

  return (
    <div style={{ width: "500px", paddingTop: "20px" }}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="images"
          label="Images"
          getValueFromEvent={(e) => {
            setFiletype(
              e.fileList[0] && e.fileList[0].name.split(".")[1].toLowerCase()
            );
            return e.fileList;
          }}
          rules={[{ required: true, message: "Missing image" }]}
          valuePropName="fileList"
        >
          <ImgUpload />
        </Form.Item>
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
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Patient's Age"
              name="patient_age"
              rules={[{ required: true, message: "Please input patient's age" }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Scan Date"
              name="scan_date"
              rules={[{ required: true, message: "Please input scan data" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Clinician's name"
              name="clinician_name"
              rules={[{ required: true, message: "Please input clinician's name" }]}
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
