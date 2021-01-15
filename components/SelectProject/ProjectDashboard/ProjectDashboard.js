import { Statistic, Card, Space, message, Descriptions } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Bar from "../../Chart/Bar/Bar";
import Pie from "../../Chart/Pie/Pie";

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
            <Descriptions.Item label="Name" span="8">
              {props.project.name}
            </Descriptions.Item>
            <Descriptions.Item label="Type" span="8">
              {/*TODO CHANGE THIS LATER*/}
              Segmentation
            </Descriptions.Item>
            <Descriptions.Item label="Description" span="8">
              {props.project.description}
            </Descriptions.Item>
            <Descriptions.Item label="Pipelines" span="8">
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
          value=" "
          prefix={
            <Pie
              data={predClasses}
              label="# of images in each predicted classes"
            />
          }
        />
      </Card>
      <Card style={{ height: "380px", width: "350px" }}>
        <Statistic
          title="Image Classes"
          value=" "
          prefix={<Bar data={imgClasses} label="# of images" />}
        />
      </Card>
    </Space>
  );
};

export default ProjectDashboard;
