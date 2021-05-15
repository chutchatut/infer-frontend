import { Button, Popover, Space } from "antd";
import React from "react";
import axios from "axios";
import Link from "next/link";

// const download = (url) => {
//   window.open(url, "_self");
// };

const download = async (download_url, name) => {
  const response = await axios({
    url: download_url,
    method: "GET",
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
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
          <Space>
            <Button
              type="primary"
              onClick={download.bind(
                this,
                props.record.data,
                props.record.data.split("/").pop()
              )}
            >
              Image
            </Button>
            {props.task_type.indexOf("segmentation") !== -1 && (
              <Button
                type="primary"
                onClick={download.bind(
                  this,
                  props.record.actual_mask,
                  props.record.actual_mask &&
                    props.record.actual_mask.split("/").pop()
                )}
                disabled={!props.record.actual_mask}
              >
                Result from user
              </Button>
            )}
          </Space>
          {props.task_type.indexOf("segmentation") !== -1 &&
            props.record.result.map(
              (res) =>
                res.predicted_mask &&
                res.predicted_mask[0] && (
                  <Button
                    onClick={download.bind(
                      this,
                      res.predicted_mask[0].mask,
                      res.predicted_mask[0].mask.split("/").pop()
                    )}
                  >
                    Pipeline: {res.pipeline_name}
                  </Button>
                )
            )}
        </Space>
      }
    >
      {props.children}
    </Popover>
  );
};

export default Download;
