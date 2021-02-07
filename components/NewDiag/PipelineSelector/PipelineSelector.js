import { CheckOutlined, MoreOutlined } from "@ant-design/icons";
import { Card, Descriptions, Skeleton, Space, Typography } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useState } from "react";

const { Paragraph } = Typography;

const PipelineSelector = (props) => {
  const [pipelineOnModal, setPipelineOnModal] = useState(null);
  console.log(pipelineOnModal);
  return (
    <>
      <Space wrap size="middle">
        {props.pipelines.map((pipeline, i) => (
          <Card
            style={{
              width: "200px",
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
              <MoreOutlined
                onClick={setPipelineOnModal.bind(this, pipeline)}
              />,
            ]}
          >
            <Card.Meta
              title={pipeline.name}
              description={pipeline.model_name}
            />
          </Card>
        ))}
      </Space>
      <Modal
        visible={pipelineOnModal}
        onCancel={setPipelineOnModal.bind(this, null)}
        width="850px"
        footer=""
      >
        <div style={{ width: "600px", height: "300px", overflow: "auto" }}>
          {pipelineOnModal ? (
            <Descriptions title="Project Info">
              <Descriptions.Item label="Name" span="3">
                {pipelineOnModal.name}
              </Descriptions.Item>
              <Descriptions.Item label="Model name" span="3">
                {pipelineOnModal.model_name}
              </Descriptions.Item>
              <Descriptions.Item label="Pipeline's ID" span="3">
                {pipelineOnModal.pipeline_id}
              </Descriptions.Item>
              <Descriptions.Item label="Operator" span="3">
                {pipelineOnModal.operator}
              </Descriptions.Item>
              <Descriptions.Item label="Description" span="3">
                <Paragraph
                  ellipsis={{ rows: 3, expandable: true, symbol: "more" }}
                >
                  {pipelineOnModal.description}
                </Paragraph>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Skeleton />
          )}
        </div>
      </Modal>
    </>
  );
};

export default PipelineSelector;
