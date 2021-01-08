import React from "react";
import Pie from "../../components/Chart/Pie/Pie";
import Bar from "../../components/Chart/Bar/Bar";
import { Statistic, Card, Space } from "antd";
import styles from "./home.module.css";

const Home = () => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <Space>
      <Card>
        <Statistic
          title="Predicted Classes"
          value=" "
          prefix={
            <Pie
              data={predClasses}
              label="# of images in each predicted classes"
            />
          }
        />
      </Card>
      <Card>
        <Statistic
          title="Image Classes"
          value=" "
          prefix={<Bar data={imgClasses} label="# of images" />}
        />
      </Card>
    </Space>
  );
};

export default Home;
