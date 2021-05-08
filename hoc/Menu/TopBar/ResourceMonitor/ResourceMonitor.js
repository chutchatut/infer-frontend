import { IssuesCloseOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm, Progress, Space } from "antd";
import React from "react";

const ResourceMonitor = () => {
  return (
    <Space style={{ color: "white", lineHeight: 0, width: 220, height: 50 }}>
      <span>MEM: </span>
      <Progress
        percent={30}
        steps={10}
        size="small"
        strokeColor="#52c41a"
        showInfo={false}
      />
      <span>GPU: </span>
      <Progress
        percent={20}
        steps={10}
        size="small"
        strokeColor="#52c41a"
        showInfo={false}
      />
      <Popconfirm
        placement="bottom"
        title="Do you want to reset inference server?"
        onConfirm={() => {
          //reset trtis
        }}
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
