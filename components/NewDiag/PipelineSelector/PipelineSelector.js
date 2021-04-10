import { Descriptions, Select, Space } from "antd";
import React from "react";

const PipelineSelector = (props) => {
  console.log(props);
  return (
    <Space direction="vertical" size="large">
      <Select
        value={props.selectedPipeline && props.selectedPipeline.name}
        style={{ width: "200px" }}
        onChange={(e) =>
          props.setSelectedPipeline(props.pipelines.find((p) => p.id === e))
        }
      >
        {props.pipelines.map((pipeline, i) => (
          <Select.Option key={pipeline.id} value={pipeline.id}>
            {pipeline.name}
          </Select.Option>
        ))}
      </Select>
      <Descriptions title="Project Info">
        <Descriptions.Item label="Pipeline Name" span="3">
          {props.selectedPipeline && props.selectedPipeline.name}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span="3">
          {props.selectedPipeline && props.selectedPipeline.description}
        </Descriptions.Item>
        <Descriptions.Item label="Clara Pipeline Name" span="3">
          {props.selectedPipeline && props.selectedPipeline.clara_pipeline_name}
        </Descriptions.Item>
        <Descriptions.Item label="Clara Pipeline ID" span="3">
          {props.selectedPipeline && props.selectedPipeline.pipeline_id}
        </Descriptions.Item>
        <Descriptions.Item label="Operator" span="3">
          {props.selectedPipeline && props.selectedPipeline.operator}
        </Descriptions.Item>
      </Descriptions>
    </Space>
  );
};

export default PipelineSelector;
