import { Space, Tabs, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Figure from "./Figure/Figure";
import Info from "./Info/Info";
import * as actions from "../../store/actions";

const ProjectDashboard = (props) => {
  const project = props.projectData && props.projectData.project;

  const [pipelines, setPipelines] = useState(null);
  useEffect(async () => {
    if (project)
      setPipelines(
        (await axios.get(`/api/project/${project.id}/list_pipeline/`)).data
          .result
      );
  }, [project]);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Space direction="vertical" size="large">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Project Info" key="1">
          <Info project={project} pipelines={pipelines} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dashboard" key="2">
          <Figure projectData={props.projectData} />
        </Tabs.TabPane>
      </Tabs>
      <Space>
        <Button onClick={router.push.bind(this, "/home")}>Go back</Button>
        <Button
          type="primary"
          onClick={() => {
            dispatch(actions.setCurrentProject(project));
            router.push("/home");
          }}
        >
          Select
        </Button>
      </Space>
    </Space>
  );
};

export default ProjectDashboard;
