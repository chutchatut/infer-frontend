import { TreeSelect } from "antd";
import React from "react";

const { TreeNode } = TreeSelect;

const PipelineSelect = (props) => {
  console.log(props);
  return (
    <TreeSelect
      showSearch
      style={{ width: "100%" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      allowClear
      treeDefaultExpandAll
      onChange={props.onChange}
    >
      {props.projects.map((project) => (
        <TreeNode title={project.name} selectable={false}>
          {project.pipeline.map((pipeline) => (
            <TreeNode value={pipeline.id} title={pipeline.name} />
          ))}
        </TreeNode>
      ))}
    </TreeSelect>
  );
};

export default PipelineSelect;
