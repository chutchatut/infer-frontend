import { Tabs } from "antd";
import React from "react";
import ImgUpload from "../../components/ImgUpload/ImgUpload";
import styles from "./newDiagnosis.module.css";
import { Form, Button, Select } from "antd";

const { TabPane } = Tabs;

const newDiagnosis = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(form);
    console.log("Received values of form:", values);
  };

  const pipelines = [
    { label: "COVID-19 + Pnuemonia", value: "covid_19_pnuemonia" },
  ];

  return (
    <div className={styles.Layout}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Upload files" key="1">
          <div style={{ width: "500px", paddingTop: "20px" }}>
            <Form
              form={form}
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                name="image"
                label="Images"
                rules={[{ required: true, message: "Missing image" }]}
              >
                <ImgUpload />
              </Form.Item>
              <Form.Item
                name="pipeline"
                label="Pipeline"
                rules={[{ required: true, message: "Missing pipeline" }]}
              >
                <Select options={pipelines} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
        <TabPane tab="Select from remote files" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default newDiagnosis;
