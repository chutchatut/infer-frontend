import { Image, Space } from "antd";
import axios from "axios";
import React, { Fragment } from "react";

const statuses = [
  {
    text: "Uploaded",
    color: "black",
  },
  {
    text: "In progress",
    color: "red",
  },
  {
    text: "AI-Annotated",
    color: "yellow",
  },
  {
    text: "Verified",
    color: "green",
  },
];

const Viewer = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Space>
        <Image
          key="img"
          src={`${axios.defaults.baseURL}${props.img.data16}`}
        //   style={{ width: "20vw", height: "auto" }}
        />
        <Image
          key="gradcam"
          src={`${axios.defaults.baseURL}${props.gradcam}`}
        //   style={{ width: "20vw", height: "auto" }}
        />
      </Space>
      <h2>{props.img.name}</h2>
      <>
        <span style={{ color: statuses[props.img.status].color }}>● </span>
        {statuses[props.img.status].text}
      </>
    </div>
  );
};

export default Viewer;
