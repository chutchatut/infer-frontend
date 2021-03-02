import { Button, Form, message, Space, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const Forms = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log(values, props);
    let response;
    setLoading(true);

    // -------------------------------------------

    if (props.includeFile) {
      switch (props.requestType) {
        case "POST":
          const formData = new FormData();
          for (let key in values) {
            formData.append(key, values[key]);
          }
          console.log(formData);
          response = await axios.post(props.requestURL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      }
    } else {
    }

    // ---------------------------------------------

    if (response && response.status === 200) {
      message.success("Upload successful");
      setLoading(false);
      form.resetFields();
    }
  };

  return (
    <Form
      form={form}
      style={{ width: "500px", padding: "0px", marginTop: "20px" }}
      onFinish={onFinish}
      {...layout}
    >
      <Typography.Title level={3} style={{ paddingLeft: "120px" }}>
        {props.pageTitle}
      </Typography.Title>

      {props.formConfig.map((form) => (
        <Form.Item {...form.config} key={form.config.name}>
          {form.form}
        </Form.Item>
      ))}
      <Form.Item {...tailLayout}>
        <Button loading={loading} type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Forms;
