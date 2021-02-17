import { Card, Carousel, Space, Statistic } from "antd";
import React from "react";
import Bar from "./Chart/Bar/Bar";
import Pie from "./Chart/Pie/Pie";

const Figure = (props) => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <Space size="medium" wrap>
      <Card title="Predicted classes">
        <Pie
          config={{ style: { height: "200px", width: "300px" } }}
          data={Object.keys(predClasses).map((key) => ({
            label: key,
            value: predClasses[key],
          }))}
          label="# of images in each predicted classes"
        />
      </Card>
      <Card title="Labelled classes">
        <Bar
          config={{ style: { height: "200px", width: "300px" } }}
          data={Object.keys(imgClasses).map((key) => ({
            label: key,
            value: imgClasses[key],
          }))}
          label="# of images"
        />
      </Card>
    </Space>
  );
};

export default Figure;
