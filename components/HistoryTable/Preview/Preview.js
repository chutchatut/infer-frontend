import { Popover } from "antd";
import React from "react";

const Preview = (props) => {
  if (props.enable)
    return (
      <Popover
        placement="left"
        content={<img src={props.url} width="200" />}
      >
        {props.children}
      </Popover>
    );
  return props.children;
};

export default Preview;
