import { Select } from "antd";
import React from "react";

const taskTypes = [
  "2D Segmentation",
  "2D Classification",
  "3D Segmentation",
  "3D Classification",
];

const TaskSelect = (props) => {
  return (
    <Select onChange={props.onChange}>
      {taskTypes.map((taskType) => (
        <Select.Option value={taskType} key={taskType}>{taskType}</Select.Option>
      ))}
    </Select>
  );
};

export default TaskSelect;
