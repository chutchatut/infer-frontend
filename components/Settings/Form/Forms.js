import { Button, Form, message, Space, Typography } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTemplate from "./FormTemplate/FormTemplate";
import * as actions from "../../../store/actions";

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
  const currentProject = useSelector((state) => state.project.currentProject);

  const formTemplate = FormTemplate(currentProject, form)[props.page];
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values, props, formTemplate);
    let response;
    setLoading(true);

    // -------------------------------------
    // format URL using string
    let URL = formTemplate.requestURL;
    for (let key in values) {
      URL = URL.replace(`{${key}}`, values[key]);
    }
    console.log(URL);
    // -------------------------------------

    try {
      if (formTemplate.includeFile) {
        switch (formTemplate.requestType) {
          case "POST":
            const formData = new FormData();
            for (let key in values) {
              formData.append(key, values[key]);
            }
            console.log(formData);
            response = await axios.post(URL, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
        }
      } else {
      }

      if (response && response.status === 200) {
        message.success("Upload successful");
        setLoading(false);
        dispatch(actions.fetchProjects());
        form.resetFields();
      }
    } catch (error) {
      message.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <Space direction="vertical">
      <Typography.Title
        level={4}
        style={{ paddingTop: "20px", paddingLeft: "120px" }}
      >
        {formTemplate.pageTitle}
      </Typography.Title>
      <Form
        form={form}
        style={{ width: "500px", padding: "0px" }}
        onFinish={onFinish}
        {...layout}
      >
        {formTemplate.formConfig.map((form) => (
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
    </Space>
  );
};

export default Forms;
