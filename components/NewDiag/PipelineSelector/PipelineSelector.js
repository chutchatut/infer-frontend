import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

const pipelines = [
  { name: "test", desc: "lorem ipsum" },
  {
    name: "test",
    desc:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const { Paragraph } = Typography;

const PipelineSelector = () => {
  const [pipelineOnModal, setPipelineOnModal] = useState(null);
  return (
    <>
      <Space wrap size="middle">
        {pipelines.map((pipeline, i) => (
          <Card
            style={{
              width: "200px",
              // height: "200px",
            }}
            key={i}
            actions={[
              <CheckOutlined onClick={() => {}} />,
              <MoreOutlined onClick={setPipelineOnModal.bind(this, "test")} />,
            ]}
          >
            <Card.Meta
              title={pipeline.name}
              description={<Paragraph ellipsis={3}>{pipeline.desc}</Paragraph>}
            />
          </Card>
        ))}
      </Space>
      <Modal
        title={pipelineOnModal && pipelineOnModal.name}
        visible={pipelineOnModal}
        onCancel={setPipelineOnModal.bind(this, null)}
        // onOk={() => {
        //   dispatch(actions.setCurrentProject(projectOnModal));
        //   setProjectOnModal(null);
        // }}
        // okText="Select this project"
        width="850px"
        footer=""
        // height="800px"
      >
        <div style={{ width: "800px", height: "500px", overflow: "auto" }}>
          <p>test</p>
        </div>
      </Modal>
    </>
  );
};

export default PipelineSelector;
