import { ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Statistic,
  Card,
  Space,
  message,
  Descriptions,
  Typography,
  Tag,
  Popover,
  Tabs,
} from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Figure from "./Figure/Figure";
import Info from "./Info/Info";

const { Paragraph } = Typography;

const ProjectDashboard = (props) => {
  const [pipelines, setPipelines] = useState(null);
  useEffect(async () => {
    if (props.project)
      setPipelines(
        (await axios.get(`/api/project/${props.project.id}/list_pipeline/`))
          .data.result
      );
  }, [props.project]);

  return (
    <Space direction="vertical">
      {/* <Space size="large">
        <ArrowLeftOutlined style={{ color: "#777", fontSize: "30px" }} />
        <CheckOutlined
          style={{ color: "#777", fontSize: "30px" }}
          onClick={() => {}}
        />
      </Space> */}
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Project Info" key="1">
          <Info project={props.project} pipelines={pipelines} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dashboard" key="2">
          <Figure project={props.project} />
        </Tabs.TabPane>
      </Tabs>
   
    </Space>
  );
};

export default ProjectDashboard;
