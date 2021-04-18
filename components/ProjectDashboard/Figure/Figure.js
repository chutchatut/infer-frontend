import { Card, Carousel, Space, Statistic } from "antd";
import React from "react";
import Chart from "./Chart/Chart";

const Figure = (props) => {
  return (
    <Space size="middle" wrap>
      <Card title="Predicted classes">
        <Chart.Pie
          config={{ style: { height: "200px", width: "300px" } }}
          data={Object.keys(props.projectData.predicted).map((key) => ({
            label: key,
            value: props.projectData.predicted[key],
          }))}
        />
      </Card>
      <Card title="Labelled classes">
        <Chart.Bar
          config={{ style: { height: "200px", width: "400px" } }}
          data={Object.keys(props.projectData.status).map((key) => ({
            label: key,
            value: props.projectData.status[key],
          }))}
        />
      </Card>
    </Space>
  );
};

export default Figure;
