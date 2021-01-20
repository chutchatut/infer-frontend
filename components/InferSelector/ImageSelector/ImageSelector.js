import { Transfer } from "antd";
import React, { useState } from "react";

const mockData = [
  { key: "1", title: "0001.dcm" },
  { key: "2", title: "0002.dcm" },
  { key: "3", title: "0003.dcm" },
  { key: "4", title: "0004.dcm" },
];

const ImageSelector = (props) => {
  const [selectedKeys, setSelectedKeys] = useState([]);

  return (
    <Transfer
      oneWay
      dataSource={mockData}
      onSelectChange={setSelectedKeys}
      selectedKeys={selectedKeys}
      onChange={props.onChange}
      targetKeys={props.value}
      render={(item) => item.title}
    />
  );
};

export default ImageSelector;
