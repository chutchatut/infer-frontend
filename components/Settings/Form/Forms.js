import { Button, Form, message, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getFormTemplate from "./FormTemplate/FormTemplate";
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

  const [users, setUsers] = useState([]);

  const reloadUsers = async () => {
    const response = await axios.get("/api/user/");
    setUsers(response.data.map((u) => ({ ...u })));
  };

  useEffect(() => reloadUsers(), []);

  useEffect(() => {
    form.resetFields();
  }, [props.page]);

  const formTemplate = getFormTemplate(form, users)[
    props.page
  ];
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values, props, formTemplate);
    let response;
    setLoading(true);

    // ----- format URL using string -------

    let URL = formTemplate.requestURL;
    for (let key in values) {
      // Do not replace `{${key}}` with key
      URL = URL.replace(`{${key}}`, values[key]);
    }
    console.log(URL);

    // -------------------------------------

    try {
      const formData = new FormData();
      for (let key in values) {
        if (values[key]) {
          formData.append(key, values[key]);
        }
      }

      // ---------- handle upload ---------------
      switch (formTemplate.requestType) {
        case "POST":
          response = await axios.post(URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          break;
        case "PUT":
          response = await axios.put(URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          break;
        case "DELETE":
          response = await axios.delete(URL, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          break;
      }
      // ----------------------------------------

      if (response && response.status === 200) {
        message.success("edit successful");
        setLoading(false);
        dispatch(actions.fetchProjects());
        reloadUsers();
        // form.resetFields();
      }
    } catch (error) {
      message.error(
        `The following error occured: ${error.response.data.message}`
      );
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
        key={props.page}
        form={form}
        style={{ width: "700px", padding: "0px" }}
        onFinish={onFinish}
        {...layout}
      >
        {formTemplate.formConfig.map((form) => (
          <Form.Item {...form.config} key={form.config.name}>
            {form.form}
          </Form.Item>
        ))}
        <Form.Item {...tailLayout}>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            danger={formTemplate.requestType === "DELETE"}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Forms;
