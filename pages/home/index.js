import React, { useEffect, useState } from "react";
import Pie from "../../components/Chart/Pie/Pie";
import Bar from "../../components/Chart/Bar/Bar";
import { Statistic, Card, Space, message, Row, Col, Descriptions } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
// import styles from "./home.module.css";

const Home = () => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };
  const [project, setProject] = useState(null);

  const currentProject = useSelector((state) => state.project.currentProject);

  useEffect(async () => {
    try {
      if (!currentProject) return;
      const projectData = await axios.get(`/api/project/${currentProject.id}`);
      setProject(projectData.data.project);
    } catch (error) {
      message.error("There was an error loading the page!");
    }
  }, [currentProject]);

  if (!currentProject || !project) return <p>Please select a project</p>;

  return (
    <Space wrap>
      <Card style={{ height: "400px", width: "600px" }}>
        <Space direction="vertical">
          <Descriptions title="Project Info">
            <Descriptions.Item label="Name" span="8">
              {project.name}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span="8">
              {project.description}
            </Descriptions.Item>
            <Descriptions.Item label="Pipelines" span="8">
              {project.pipeline ? (
                <ul>
                  {project.pipeline.map((pipe) => (
                    <li>{pipe}</li>
                  ))}
                </ul>
              ) : (
                "Empty"
              )}
            </Descriptions.Item>
          </Descriptions>
        </Space>
      </Card>
      <Card style={{ height: "400px", width: "350px" }}>
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
      <Card style={{ height: "400px", width: "350px" }}>
        <Statistic
          title="Image Classes"
          value=" "
          prefix={<Bar data={imgClasses} label="# of images" />}
        />
      </Card>
    </Space>
  );
};

export default Home;
