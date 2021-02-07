import {
  Statistic,
  Card,
  Space,
  message,
  Descriptions,
  Typography,
  Tag,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Bar from "../../Chart/Bar/Bar";
import Pie from "../../Chart/Pie/Pie";

const { Paragraph } = Typography;

const ProjectDashboard = (props) => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  const [project, setProject] = useState(null);
  useEffect(async () => {
    try {
      if (!props.project) return;
      const projectData = await axios.get(`/api/project/${props.project.id}`);
      setProject(projectData.data.project);
    } catch (error) {
      message.error("There was an error loading the page!");
    }
  }, [props.project]);

  const [pipelines, setPipelines] = useState(null);
  useEffect(async () => {
    if (props.project)
      setPipelines(
        (await axios.get(`/api/project/${props.project.id}/list_pipeline/`))
          .data.result
      );
  }, [props.project]);

  return (
    <Space wrap>
      <Card
        style={{
          width: "600px",
        }}
      >
        <Space direction="vertical">
          <Descriptions title="Project Info">
            <Descriptions.Item label="Name" span="3">
              {props.project.name}
            </Descriptions.Item>
            <Descriptions.Item label="Task" span="3">
              <Tag color="green">{props.project.task}</Tag>
            </Descriptions.Item>
            <Descriptions.Item
              label="Description"
              span="3"
              key={props.project.name}
            >
              <Paragraph
                ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
              >
                {props.project.description}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Pipelines" span="3">
              <Space wrap>
                {pipelines && pipelines.length
                  ? pipelines.map((pipeline) => (
                      <Tag color="volcano">{pipeline.name}</Tag>
                    ))
                  : "Empty"}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Classes" span="3">
              <Space wrap>
                {project && project.predclasses
                  ? project.predclasses.map((predclass) => (
                      <Tag color="blue">{predclass}</Tag>
                    ))
                  : "empty"}
              </Space>
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
      <Card style={{ height: "380px", width: "350px" }}>
        <Statistic
          title="Predicted Classes"
          formatter={() => (
            <Pie
              data={predClasses}
              seed={2}
              label="# of images in each predicted classes"
            />
          )}
        />
      </Card>
      <Card style={{ height: "380px", width: "350px" }}>
        <Statistic
          title="Image Classes"
          formatter={() => (
            <Bar seed={3} data={imgClasses} label="# of images" />
          )}
        />
      </Card>
    </Space>
  );
};

export default ProjectDashboard;
