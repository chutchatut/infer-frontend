import { Button, Popover, Space } from "antd";
import React from "react";
import axios from "axios";
import Link from "next/link";

// const download = (url) => {
//   window.open(url, "_self");
// };

const download = async (download_url) => {
  const response = await axios({
    url: download_url,
    method: "GET",
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "image.jpg");
  document.body.appendChild(link);
  link.click();
};

const Download = (props) => {
  return (
    <Popover
      trigger="click"
      placement="right"
      content={
        <Space direction="vertical">
          <Button
            type="primary"
            onClick={download.bind(this, props.record.data)}
          >
            Image
          </Button>
          <Button>Segmentation2D</Button>
        </Space>
      }
    >
      {props.children}
    </Popover>
  );
};

export default Download;
