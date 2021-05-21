import { IssuesCloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { message, Popconfirm, Progress, Space } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const resetTrtis = async () => {
  try {
    const response = await axios.post("/api/util/restart/");
    if (response.status === 200) message.success("Restarting");
  } catch (e) {
    message.error("Error restarting network");
  }
};

const ResourceMonitor = () => {
  const [memUsage, setMemUsage] = useState(0);
  const [gpuUsage, setGpuUsage] = useState(0);

  const token = useSelector((state) => state.auth.token);

  const reload = async () => {
    if (!token) return;
    const response = await axios.get("/api/util/check_usage");
    if (response.status === 200) {
      setMemUsage(response.data.MEM);
      setGpuUsage(response.data.GPU);
    }
  };

  const [oldInterval, setOldInterval] = useState(null);
  useEffect(() => {
    reload();
    if (oldInterval) clearInterval(oldInterval);
    setOldInterval(setInterval(reload.bind(this), 5000));
    return () => clearInterval(oldInterval);
  }, [token]);
  
  return (
    <Space style={{ color: "white", lineHeight: 0, width: 220, height: 50 }}>
      <span>MEM: </span>
      <Progress
        percent={memUsage}
        steps={10}
        size="small"
        strokeColor="#52c41a"
        showInfo={false}
      />
      <span>GPU: </span>
      <Progress
        percent={gpuUsage}
        steps={10}
        size="small"
        strokeColor="#52c41a"
        showInfo={false}
      />
      <Popconfirm
        placement="bottom"
        title="Do you want to reset inference server?"
        onConfirm={resetTrtis.bind(this)}
        okText="Yes"
        cancelText="No"
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <a>
          <IssuesCloseOutlined style={{ fontSize: 20 }} />
        </a>
      </Popconfirm>
    </Space>
  );
};

export default ResourceMonitor;
