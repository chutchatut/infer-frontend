import React from "react";
import Forms from "./Form/Forms";

const Settings = (props) => {
  // TODO add more later
  if (!props.page) {
    return "";
  }
  return <Forms page={props.page} />;
};

export default Settings;
