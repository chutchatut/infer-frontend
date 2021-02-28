import { Space, Tabs, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Figure from "./Figure/Figure";
import Info from "./Info/Info";
import * as actions from "../../store/actions";

const ProjectDashboard = (props) => {
  const [pipelines, setPipelines] = useState(null);
  useEffect(async () => {
    if (props.project)
      setPipelines(
        (await axios.get(`/api/project/${props.project.id}/list_pipeline/`))
          .data.result
      );
  }, [props.project]);

  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Space direction="vertical" size="large">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Project Info" key="1">
          <Info project={props.project} pipelines={pipelines} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dashboard" key="2">
          <Figure project={props.project} />
        </Tabs.TabPane>
      </Tabs>
      <Space>
        <Button onClick={router.push.bind(this, "/home")}>Go back</Button>
        <Button
          type="primary"
          onClick={() => {
            dispatch(actions.setCurrentProject(props.project));
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
