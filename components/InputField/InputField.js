import React from "react";
import style from "./InputField.module.css";

const InputField = (props) => {
  return (
    <div className={style.InputField}>
      {props.text}
      <input
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        type={props.type}
      />
    </div>
  );
};

export default InputField;
