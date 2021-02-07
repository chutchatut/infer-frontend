import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

const { Paragraph } = Typography;
// TODO use selectedPipeline, setSelectedPipeline from props
const PipelineSelector = (props) => {
  const [pipelineOnModal, setPipelineOnModal] = useState(null);

  return (
    <>
      <Space wrap size="middle">
        {props.pipelines.map((pipeline, i) => (
          <Card
            style={{
              width: "200px",
              // height: "200px",
            }}
            key={i}
            actions={[
              <>
                {props.selectedPipeline &&
                props.selectedPipeline.id === pipeline.id ? (
                  <CheckOutlined
                    style={{ color: "#1890ff" }}
                    onClick={props.setSelectedPipeline.bind(this, null)}
                  />
                ) : (
                  <CheckOutlined
                    onClick={props.setSelectedPipeline.bind(this, pipeline)}
                  />
                )}
              </>,
              <MoreOutlined onClick={setPipelineOnModal.bind(this, "test")} />,
            ]}
          >
            <Card.Meta
              title={pipeline.name}
              // description={<Paragraph ellipsis={3}>{pipeline.desc}</Paragraph>}
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
