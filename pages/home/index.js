import React from "react";
import Pie from "../../components/Chart/Pie/Pie";
import Bar from "../../components/Chart/Bar/Bar";
import { Statistic, Card, Row, Col } from "antd";

const Home = () => {
  const predClasses = { Normal: 15, "COVID-19": 10, Pnuemonia: 5 };
  const imgClasses = { Verified: 10, Unverified: 5 };

  return (
    <div className="site-statistic-demo-card">
      <Row gutter={16}>
        <Col span={12}>
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
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Image Classes"
              value=" "
              prefix={<Bar data={imgClasses} label="# of images" />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
