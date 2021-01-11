import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import ImgUpload from "../../components/ImgUpload/ImgUpload";
import styles from "./newDiagnosis.module.css";
import { Form, Button, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const { TabPane } = Tabs;

const newDiagnosis = () => {
  const [form] = Form.useForm();
  const [pipelines, setPipelines] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentProject = useSelector((state) => state.project.currentProject);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  useEffect(async () => {
    if (!currentProject) return;
    const projectData = await axios.get(`/api/project/${currentProject.id}`);
    setPipelines(projectData.data.project.pipelines);
    setLoading(false);
  }, [currentProject]);

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
                name="images"
                label="Images"
                getValueFromEvent={e=>e.fileList}
                rules={[{ required: true, message: "Missing image" }]}
                valuePropName="fileList"
              >
                <ImgUpload />
              </Form.Item>
              <Form.Item
                name="pipeline"
                label="Pipeline"
                rules={[{ required: true, message: "Missing pipeline" }]}
              >
                <Select
                  disabled={
                    loading || pipelines.length === 0 || !currentProject
                  }
                  placeholder={
                    currentProject
                      ? loading
                        ? "Loading please wait"
                        : pipelines.length === 0
                        ? "This project contain no pipeline"
                        : "Select a pipeline"
                      : "To proceed, please select a project"
                  }
                >
                  {pipelines.map((pipeline) => (
                    <Select.Option
                      value={pipeline.pipeline_id}
                      key={pipeline.pipeline_id}
                    >
                      {pipeline.name}
                    </Select.Option>
                  ))}
                </Select>
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
