import { Slider, Space } from "antd";
import InternalPreviewGroup from "antd/lib/image/PreviewGroup";
import React from "react";

const style = { style: { width: "100px" } };

const ColorPicker = (props) => {
  const color = props.value.split(",").map((i) => Number.parseInt(i));

  const onChange = (i, val) => {
    color[i] = val;
    props.onChange(color.join(", "));
  };
  return (
    <Space>
      <div
        style={{
          height: "20px",
          width: "40px",
          background: `rgb(${props.value})`,
        }}
      />
      <Slider
        max={255}
        {...style}
        value={color[0]}
        onChange={(val) => onChange(0, val)}
      />
      <Slider
        max={255}
        {...style}
        value={color[1]}
        onChange={(val) => onChange(1, val)}
      />
      <Slider
        max={255}
        {...style}
        value={color[2]}
        onChange={(val) => onChange(2, val)}
      />
    </Space>
  );
};

export default ColorPicker;
