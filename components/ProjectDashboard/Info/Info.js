import { Descriptions, Popover, Space, Tag, Typography } from "antd";
import React from "react";

const Info = (props) => {
  return (
    <Descriptions title={props.project.name}>
      <Descriptions.Item label="Task" span="3">
        <Tag color="green">{props.project.task}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Pipelines" span="3">
        <Space wrap>
          {props.pipelines && props.pipelines.length
            ? props.pipelines.map((pipeline) => (
                <Popover content={pipeline.description} key={pipeline.name}>
                  <Tag color="volcano">{pipeline.name}</Tag>
                </Popover>
              ))
            : "Empty"}
        </Space>
      </Descriptions.Item>
      {props.project.task.indexOf("Classification") !== -1 && (
        <Descriptions.Item label="Classes" span="3">
          <Space wrap>
            {props.project && props.project.predclasses
              ? props.project.predclasses.map((predclass) => (
                  <Tag color="blue" key={predclass}>
                    {predclass}
                  </Tag>
                ))
              : "empty"}
          </Space>
        </Descriptions.Item>
      )}
      <Descriptions.Item label="Description" span="3" key={props.project.name}>
        {props.project.description}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default Info;
