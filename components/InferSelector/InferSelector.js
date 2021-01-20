import React, { Fragment, useState } from "react";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import axios from "axios";
import ImageSelector from "./ImageSelector/ImageSelector";

const InferSelector = (props) => {
  const [form] = Form.useForm();
  const [pipeline, setPipeline] = useState(null);

  const onFinish = async (values) => {
    console.log("Received values of form:", values);
  };

  const onValuesChange = (changedValues) => {
    if (changedValues.pipeline) {
      setPipeline(changedValues.pipeline);
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
          name="pipeline"
          label="Pipeline"
          rules={[{ required: true, message: "Missing pipeline" }]}
        >
          <Select>
            <Select.Option value="COVID-19 + Pnuenonia V1">
              COVID-19 + Pnuenonia V1
            </Select.Option>
          </Select>
        </Form.Item>
        {pipeline && (
          <Form.Item
            name="images"
            label="Images"
            rules={[{ required: true, message: "Missing image" }]}
          >
            <ImageSelector />
          </Form.Item>
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

export default InferSelector;
