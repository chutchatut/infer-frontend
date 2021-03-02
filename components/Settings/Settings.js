import React, { Fragment } from "react";
import Forms from "./Form/Forms";
import FormTemplate from "./Form/FormTemplate";

const Settings = (props) => {
  // TODO add more later
  if (!props.page) {
    return "";
  }
  return <Forms {...FormTemplate[props.page]} />;
};

export default Settings;
