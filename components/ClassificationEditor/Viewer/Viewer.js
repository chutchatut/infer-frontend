import { Col, Image, Row, Space } from "antd";
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
    <>
      <Row>
        <Col style={{ width: "100%" }}>
          <Image.PreviewGroup>
            <Row gutter={8}>
              <Col span={12}>
                <Image
                  key="img"
                  src={`${axios.defaults.baseURL}${props.img.data}`}
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col span={12}>
                <Image
                  key="gradcam"
                  src={`${axios.defaults.baseURL}${props.gradcam}`}
                  width="100%"
                  style={{ objectFit: "cover" }}
                />
              </Col>
            </Row>
          </Image.PreviewGroup>
        </Col>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <h2>{props.img.name}</h2>
      </Row>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <>
          <span style={{ color: statuses[props.img.status].color }}>● </span>
          {statuses[props.img.status].text}
        </>
      </Row>
    </>
  );
};

export default Viewer;
