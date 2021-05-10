import { IssuesCloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, Progress, Space } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const resetTrtis = async () => {};

const ResourceMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState({ mem: 0, gpu: 0 });
  const [timer, setTimer] = useState(null);
  const [tick, setTick] = useState(true);

  const reload = async () => {
    const response = await axios.get("/api/util/check_usage");
    if (response.status === 200) {
      const mem = response.data.MEM;
      const gpu = response.data.GPU;
      setMemoryUsage({ mem: mem, gpu: gpu });
    }
  };

  useEffect(() => {
    reload();
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      setTick((tick) => !tick);
    }, 5000);
    setTimer(newTimer);
  }, [tick]);

  return (
    <Space style={{ color: "white", lineHeight: 0, width: 220, height: 50 }}>
      <span>MEM: </span>
      <Progress
        percent={memoryUsage.mem}
        steps={10}
        size="small"
        strokeColor="#52c41a"
        showInfo={false}
      />
      <span>GPU: </span>
      <Progress
        percent={memoryUsage.gpu}
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
