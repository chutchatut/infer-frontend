import { Button, Popover, Space } from "antd";
import React from "react";

const Download = (props) => {
  return (
    <Popover
      trigger="click"
      placement="right"
      content={
        <Space direction="vertical">
          <Button>Image</Button>
          <Button>Segmentation2D</Button>
        </Space>
      }
    >
      {props.children}
    </Popover>
  );
};

export default Download;
