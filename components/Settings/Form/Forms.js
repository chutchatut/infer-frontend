import { Button, Form, message, Space, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
  const [pipelines, setPipelines] = useState([]);

  const reloadPipeline = async () => {
    setPipelines(
      (await axios.get(`/api/project/${currentProject.id}/list_pipeline/`)).data
        .result
    );
  };

  useEffect(async () => {
    if (!currentProject || !currentProject.id) return;
    reloadPipeline();
  }, [currentProject && currentProject.id]);

  useEffect(() => {
    form.resetFields();
  }, [currentProject && currentProject.id, props.page]);

  const formTemplate = FormTemplate(currentProject, form, pipelines)[
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
      }
      // ----------------------------------------

      if (response && response.status === 200) {
        message.success("Upload successful");
        setLoading(false);
        dispatch(actions.fetchProjects());
        reloadPipeline();
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
