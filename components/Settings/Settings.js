import { Skeleton } from "antd";
import { defaults } from "chart.js";
import React, { Fragment } from "react";

const Settings = (props) => {
  // TODO add more later
  switch (props.page) {
    case "create-project":
      return <Fragment />;
    default:
      return <Fragment />;
  }
};

export default Settings;
