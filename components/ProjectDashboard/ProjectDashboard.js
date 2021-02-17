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
      <Space wrap>
        <div
          style={{
            width: "600px",
          }}
        >
          <Space direction="vertical">
            <Info project={props.project} pipelines={pipelines} />
          </Space>
        </div>
        <Figure project={props.project} />
      </Space>
    </Space>
  );
};

export default ProjectDashboard;
