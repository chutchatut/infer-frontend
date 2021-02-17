import { Card, Carousel, Space, Statistic } from "antd";
import React from "react";
import Bar from "../../Chart/Bar/Bar";
import Pie from "../../Chart/Pie/Pie";

const contentStyle = {
  height: "400px",
  width: "400px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  //   background: "rgba(0,0,0,.1)",
  //   border: "solid #eee 2px",
  //   borderRadius: "15px",
};

const Figure = (props) => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <Space size="large">
      <Card>
        <Statistic
          title="Predicted Classes"
          formatter={() => (
            <Pie
              data={predClasses}
              seed={2}
              label="# of images in each predicted classes"
            />
          )}
          style={{ paddingTop: "10px" }}
        />
      </Card>

      <Card>
        <Statistic
          title="Image Classes"
          formatter={() => (
            <Bar seed={3} data={imgClasses} label="# of images" />
          )}
          style={{ paddingTop: "10px" }}
        />
      </Card>
    </Space>
  );
};

export default Figure;
