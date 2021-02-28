import { Card, Carousel, Space, Statistic } from "antd";
import React from "react";
import Chart from "./Chart/Chart";

const Figure = (props) => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <Space size="middle" wrap>
      <Card title="Predicted classes">
        <Chart.Pie
          config={{ style: { height: "200px", width: "300px" } }}
          data={Object.keys(predClasses).map((key) => ({
            label: key,
            value: predClasses[key],
          }))}
        />
      </Card>
      <Card title="Labelled classes">
        <Chart.Bar
          config={{ style: { height: "200px", width: "200px" } }}
          data={Object.keys(imgClasses).map((key) => ({
            label: key,
            value: imgClasses[key],
          }))}
        />
      </Card>
    </Space>
  );
};

export default Figure;
