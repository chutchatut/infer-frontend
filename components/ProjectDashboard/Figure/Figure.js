import { Space, Statistic } from "antd";
import React from "react";
import Bar from "../../Chart/Bar/Bar";
import Pie from "../../Chart/Pie/Pie";

const Figure = (props) => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <Space>
      <div style={{ height: "380px", width: "350px" }}>
        <Statistic
          title="Predicted Classes"
          formatter={() => (
            <Pie
              data={predClasses}
              seed={2}
              label="# of images in each predicted classes"
            />
          )}
        />
      </div>
      <div style={{ height: "380px", width: "350px" }}>
        <Statistic
          title="Image Classes"
          formatter={() => (
            <Bar seed={3} data={imgClasses} label="# of images" />
          )}
        />
      </div>
    </Space>
  );
};

export default Figure;
