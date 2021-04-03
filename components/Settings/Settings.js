import React from "react";
import Forms from "./Form/Forms";

const Settings = (props) => {
  if (!props.page) {
    return "";
  }
  return <Forms page={props.page} currentProject={props.currentProject} />;
};

export default Settings;
