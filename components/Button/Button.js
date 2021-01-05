import React from "react";
import style from "./Button.module.css";

const Button = (props) => {
  let width = props.width ? props.width : "260px";
  let height = props.height ? props.height : "84px";
  return (
    <button
      className={style.Button}
      onClick={props.onClick}
      style={{ width: width, height: height }}
    >
      {props.children}
    </button>
  );
};

export default Button;
