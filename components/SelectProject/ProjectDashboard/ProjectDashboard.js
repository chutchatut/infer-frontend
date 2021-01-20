import {
  Statistic,
  Card,
  Space,
  message,
  Descriptions,
  Typography,
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

  return (
    <Space wrap>
      <Card
        style={{
          // height: "300px",
          width: "600px",
        }}
      >
        <Space direction="vertical">
          <Descriptions title="Project Info">
            <Descriptions.Item label="Name" span="3">
              {props.project.name}
            </Descriptions.Item>
            <Descriptions.Item label="Task" span="3">
              {props.project.task}
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
              {project && project.pipelines && project.pipelines.length ? (
                <ul style={{ listStyleType: "disc", paddingLeft: "15px" }}>
                  {project.pipelines.map((pipeline) => (
                    <li key={pipeline.pipeline_id}>{pipeline.name}</li>
                  ))}
                </ul>
              ) : (
                "Empty"
              )}
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
