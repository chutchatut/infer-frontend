import React, { useState } from "react";
import style from "./DropDown.module.css";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined } from "@ant-design/icons";

const DropDown = (props) => {
  const handleMenuClick = (event) => {
    message.info(`Click on ${props.options[event.key]}.`);
    props.setSelectedItem(props.options[event.key]);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {props.options.map((option, i) => (
        <Menu.Item key={i}>{option}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div className={style.DropDown}>
      {props.text}
      <Dropdown overlay={menu}>
        <Button>
          {props.selectedItem ? props.selectedItem : props.text}
          <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default DropDown;
