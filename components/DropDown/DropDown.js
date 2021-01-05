import React from "react";
import style from "./DropDown.module.css";

const DropDown = (props) => {
  const width = props.width ? props.width : "80vw";
  const height = props.height ? props.height : "54px";
  return (
    <div className={style.DropDown}>
      {props.text}
      <select
        style={{ width: width, height: height }}
        onChange={props.onChange}
        multiple={props.multiple}
      >
        {props.options.map((option) => (
          <option>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
